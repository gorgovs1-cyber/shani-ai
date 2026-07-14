# ============================================================
# Client Research Inbox Worker V1 - Task Scheduler install/uninstall
#
# NOT run automatically. Shani runs this once, after approving.
#
# Install:
#   powershell -NoProfile -ExecutionPolicy Bypass -File install-task.ps1
# Uninstall:
#   powershell -NoProfile -ExecutionPolicy Bypass -File install-task.ps1 -Uninstall
#
# Behavior (same proven-safe pattern as
# ../inspiration-inbox/install-task.ps1, distinct task name):
#   - runs worker.mjs (node) every 10 minutes
#   - only while the user is logged in (V1)
#   - Task Scheduler refuses a second instance (IgnoreNew) and the worker
#     itself also holds a single-instance lock file
#   - never installs an inbound listener - this task only ever calls OUT to
#     Supabase to poll; nothing makes this machine publicly reachable
# ============================================================

[CmdletBinding()]
param(
    [string]$TaskName = 'ShaniAI-ClientResearchInbox-Worker',
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

$workerPath = Join-Path $RepoDir 'ai-company\workers\client-research-inbox\worker.mjs'
if (-not (Test-Path $workerPath)) { throw "worker.mjs not found at $workerPath" }

# Resolve node.exe now so the scheduled task does not depend on PATH expansion.
$nodeExe = (Get-Command node -ErrorAction Stop).Source

$action = New-ScheduledTaskAction `
    -Execute $nodeExe `
    -Argument "`"$workerPath`"" `
    -WorkingDirectory $RepoDir

# RepetitionDuration is deliberately OMITTED: repetition then continues
# indefinitely. [TimeSpan]::MaxValue serializes into invalid task XML
# (Duration "P99999999DT23H59M59S") and Register-ScheduledTask rejects it -
# same failure already observed and avoided in the Inspiration Inbox worker's
# install script; reused here unchanged.
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(2) `
    -RepetitionInterval (New-TimeSpan -Minutes $IntervalMinutes)

# Interactive logon type = runs only when the user is logged in (V1 requirement).
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Limited

$settings = New-ScheduledTaskSettingsSet `
    -MultipleInstances IgnoreNew `
    -ExecutionTimeLimit (New-TimeSpan -Hours 2) `
    -StartWhenAvailable

Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger `
    -Principal $principal -Settings $settings `
    -Description 'Shani AI - Client Research Inbox Worker V1. Polls Supabase for audit-form jobs and runs the existing Client Research Desk. Never prices, proposes, or contacts a client.' `
    -ErrorAction Stop | Out-Null

# Success is claimed ONLY if the task actually exists after registration.
$task = Get-ScheduledTask -TaskName $TaskName -ErrorAction Stop
$info = Get-ScheduledTaskInfo -TaskName $TaskName -ErrorAction Stop
$act  = $task.Actions[0]
Write-Host "Installed and verified scheduled task:"
Write-Host ("  Name:     " + $task.TaskName)
Write-Host ("  State:    " + $task.State)
Write-Host ("  Next run: " + $(if ($info.NextRunTime) { $info.NextRunTime } else { '(not reported yet)' }))
Write-Host ("  Repeats:  every " + $task.Triggers[0].Repetition.Interval + " (indefinitely; no Duration element)")
Write-Host ("  Command:  " + $act.Execute + ' ' + $act.Arguments)
Write-Host "Uninstall with: powershell -NoProfile -ExecutionPolicy Bypass -File install-task.ps1 -Uninstall"
