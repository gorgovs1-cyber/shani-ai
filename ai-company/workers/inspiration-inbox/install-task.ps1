# ============================================================
# Inspiration Inbox Worker V1 - Task Scheduler install/uninstall
#
# NOT run automatically. Shani runs this once, after approving.
#
# Install:
#   powershell -NoProfile -ExecutionPolicy Bypass -File install-task.ps1
# Uninstall:
#   powershell -NoProfile -ExecutionPolicy Bypass -File install-task.ps1 -Uninstall
#
# Behavior:
#   - runs worker.mjs (node) every 10 minutes
#   - only while the user is logged in (V1)
#   - Task Scheduler refuses a second instance (IgnoreNew) and the
#     worker itself also holds a single-instance lock file
# ============================================================

[CmdletBinding()]
param(
    [string]$TaskName = 'ShaniAI-InspirationInbox-Worker',
    [string]$RepoDir = 'C:\Projects\shifted-tech-inspiration-worker',
    [int]$IntervalMinutes = 10,
    [switch]$Uninstall
)

$ErrorActionPreference = 'Stop'

if ($Uninstall) {
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
    Write-Host "Uninstalled scheduled task: $TaskName"
    exit 0
}

$workerPath = Join-Path $RepoDir 'ai-company\workers\inspiration-inbox\worker.mjs'
if (-not (Test-Path $workerPath)) { throw "worker.mjs not found at $workerPath" }

# Resolve node.exe now so the scheduled task does not depend on PATH expansion.
$nodeExe = (Get-Command node -ErrorAction Stop).Source

$action = New-ScheduledTaskAction `
    -Execute $nodeExe `
    -Argument "`"$workerPath`"" `
    -WorkingDirectory $RepoDir

$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(2) `
    -RepetitionInterval (New-TimeSpan -Minutes $IntervalMinutes) `
    -RepetitionDuration ([TimeSpan]::MaxValue)

# Interactive logon type = runs only when the user is logged in (V1 requirement).
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Limited

$settings = New-ScheduledTaskSettingsSet `
    -MultipleInstances IgnoreNew `
    -ExecutionTimeLimit (New-TimeSpan -Hours 2) `
    -StartWhenAvailable

Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger `
    -Principal $principal -Settings $settings `
    -Description 'Shani AI - Inspiration Inbox Worker V1. Processes queued Instagram Reel references via /watch + Content Desk. Never publishes.' | Out-Null

Write-Host "Installed scheduled task: $TaskName (every $IntervalMinutes min, only when logged in)."
Write-Host "Uninstall with: powershell -NoProfile -ExecutionPolicy Bypass -File install-task.ps1 -Uninstall"
