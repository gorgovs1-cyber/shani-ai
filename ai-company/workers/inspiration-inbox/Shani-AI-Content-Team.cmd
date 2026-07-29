@echo off
rem Shani AI - Organic Content Team - Manual Run Now
rem Double-clicked by the "Shani AI Content Team" desktop shortcut.
rem Runs run-now.ps1 once and exits - no schedule, no background process,
rem no admin rights required. -ExecutionPolicy Bypass applies only to this
rem one process, it does not change any system-wide setting.
setlocal
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0run-now.ps1"
endlocal
