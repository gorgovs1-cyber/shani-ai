<#
  Shani AI - Organic Content Team - Desktop shortcut installer
  ---------------------------------------------------------------------------
  Run this ONCE, manually, yourself:
    powershell -ExecutionPolicy Bypass -File install-shortcut.ps1

  Creates one Windows Desktop shortcut named "Shani AI Content Team" that
  points at Shani-AI-Content-Team.cmd in this same folder. The shortcut only
  runs when double-clicked - this installer does not create a scheduled
  task, does not add anything to startup, and does not need administrator
  rights (a per-user Desktop shortcut doesn't require elevation).
#>

$ErrorActionPreference = 'Stop'

$launcherDir = $PSScriptRoot
$cmdPath = Join-Path $launcherDir 'Shani-AI-Content-Team.cmd'

if (-not (Test-Path $cmdPath)) {
  Write-Host "ERROR: $cmdPath not found." -ForegroundColor Red
  Write-Host "Run this script from inside ai-company\workers\inspiration-inbox\ - it must sit next to Shani-AI-Content-Team.cmd." -ForegroundColor Red
  exit 1
}

$desktop = [Environment]::GetFolderPath('Desktop')
$shortcutPath = Join-Path $desktop 'Shani AI Content Team.lnk'

$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $cmdPath
$shortcut.WorkingDirectory = $launcherDir
$shortcut.Description = 'Shani AI - Organic Content Team - Manual Run Now. Click to run once. No schedule, nothing runs in the background.'
$shortcut.WindowStyle = 1   # normal, visible window
$shortcut.Save()

Write-Host ""
Write-Host "Desktop shortcut created: $shortcutPath" -ForegroundColor Green
Write-Host "Double-click 'Shani AI Content Team' on your Desktop any time you want to run it." -ForegroundColor DarkGray
Write-Host "It only runs when you click it - nothing is scheduled, nothing starts automatically." -ForegroundColor DarkGray
Write-Host ""
