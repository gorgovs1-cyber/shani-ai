# process-reel.ps1 - one command: queue a Reel and process it now.
# Usage:
#   powershell -NoProfile -ExecutionPolicy Bypass -File process-reel.ps1 `
#     -Url "https://www.instagram.com/reel/XXXX/" [-Liked "..."] [-Topic "..."]
# Adds the reference to the queue, then runs the worker once in this window.
# The window stays open while the team works (typically 40-60 minutes).

param(
    [Parameter(Mandatory = $true)][string]$Url,
    [string]$Liked = '',
    [string]$Topic = ''
)

$ErrorActionPreference = 'Stop'
$worker = Join-Path $PSScriptRoot 'worker.mjs'

& node $worker --add --url $Url --liked $Liked --topic $Topic
if ($LASTEXITCODE -ne 0) { throw "Failed to queue the reel (exit $LASTEXITCODE)." }

Write-Host ""
Write-Host "Queued. Processing now - keep this window open..." 
& node $worker
Write-Host ""
Write-Host "Done. Check: C:\Users\gorgo\ShaniAI\inspiration-inbox\ready (or failed\ on error)."
exit $LASTEXITCODE
