<#
  Shani AI - Organic Content Team - Manual Run Now
  ---------------------------------------------------------------------------
  One-click local launcher. Started by the "Shani AI Content Team" desktop
  shortcut (or run this script directly). Asks for an Instagram URL and an
  optional note, then runs the existing, proven Inspiration Inbox Worker in
  manual one-shot mode (worker.mjs --run-now) - the SAME watch -> Content
  Desk -> Producer pipeline the worker already uses for its queue, just
  triggered immediately instead of waiting for a Scheduler. Nothing here
  reimplements that pipeline - it only invokes it.

  Runs once and exits. No loop, no schedule, no background process, no
  auto-start. Closing this window stops everything; nothing keeps running
  after it closes.
#>

$ErrorActionPreference = 'Stop'

function Show-Header {
  Write-Host ""
  Write-Host "============================================================" -ForegroundColor DarkYellow
  Write-Host "  Shani AI Content Team - Manual Run Now" -ForegroundColor Yellow
  Write-Host "============================================================" -ForegroundColor DarkYellow
  Write-Host "  Runs once, then exits. Nothing scheduled, nothing left" -ForegroundColor DarkGray
  Write-Host "  running in the background after this window closes." -ForegroundColor DarkGray
  Write-Host ""
}

Show-Header

# ---- Locate the worker relative to this script - no hardcoded drive path,
#      works regardless of where the repo was cloned. ----
$workerDir  = $PSScriptRoot
$workerPath = Join-Path $workerDir 'worker.mjs'
$repoDir    = (Resolve-Path (Join-Path $workerDir '..\..\..')).Path
$baseDir    = 'C:\Users\gorgo\ShaniAI\inspiration-inbox'

if (-not (Test-Path $workerPath)) {
  Write-Host "ERROR: worker.mjs not found at $workerPath" -ForegroundColor Red
  Read-Host "Press Enter to close"
  exit 1
}

# ---- Ask only for what's needed ----
$url = Read-Host "Instagram URL"
while ([string]::IsNullOrWhiteSpace($url) -or ($url -notmatch '^https://(www\.)?instagram\.com/')) {
  Write-Host "  Please paste a full https://instagram.com/... URL." -ForegroundColor DarkYellow
  $url = Read-Host "Instagram URL"
}
$liked = Read-Host "What did you like about it? (optional - press Enter to skip)"

Write-Host ""
Write-Host "Starting. Visible progress stages:" -ForegroundColor Cyan
Write-Host "  1. analyzing reference" -ForegroundColor DarkGray
Write-Host "  2. researching" -ForegroundColor DarkGray
Write-Host "  3. creating" -ForegroundColor DarkGray
Write-Host "  4. reviewing" -ForegroundColor DarkGray
Write-Host "  5. producing branded visuals (only if the review approves)" -ForegroundColor DarkGray
Write-Host "  6. ready for Shani" -ForegroundColor DarkGray
Write-Host ""
Write-Host "This can take a while (watch + research + review can run well over an hour)." -ForegroundColor DarkGray
Write-Host "Live output below - keep this window open until the final report appears." -ForegroundColor DarkGray
Write-Host ""

# ---- Build the exact node invocation - reuses worker.mjs as-is, nothing rebuilt ----
$nodeArgs = @('--run-now', '--url', $url, '--repo-dir', $repoDir, '--base-dir', $baseDir)
if (-not [string]::IsNullOrWhiteSpace($liked)) { $nodeArgs += @('--liked', $liked) }

$resultLine = $null

& node $workerPath @nodeArgs 2>&1 | ForEach-Object {
  $line = $_.ToString()
  Write-Host $line
  if ($line -like 'RUN-NOW-RESULT:*') { $resultLine = $line }
}
$exitCode = $LASTEXITCODE

Write-Host ""
Write-Host "============================================================" -ForegroundColor DarkYellow
Write-Host "  Final report" -ForegroundColor Yellow
Write-Host "============================================================" -ForegroundColor DarkYellow

if (-not $resultLine) {
  Write-Host "No RUN-NOW-RESULT line was produced (node exit code: $exitCode)." -ForegroundColor Red
  Write-Host "See the output above for the exact point of failure. Nothing was opened." -ForegroundColor Red
  Read-Host "Press Enter to close"
  exit 1
}

$jsonText = $resultLine.Substring('RUN-NOW-RESULT: '.Length)
try {
  $result = $jsonText | ConvertFrom-Json
} catch {
  Write-Host "Could not parse the result line - raw output:" -ForegroundColor Red
  Write-Host $jsonText
  Read-Host "Press Enter to close"
  exit 1
}

$productionDisplay = '(none - see blocker below)'
if ($result.productionPath) { $productionDisplay = $result.productionPath }

$filesDisplay = 'n/a'
if ($null -ne $result.filesGenerated) { $filesDisplay = $result.filesGenerated }

$recordingsDisplay = 'n/a'
if ($null -ne $result.manualRecordingsRequired) { $recordingsDisplay = $result.manualRecordingsRequired }

$studioDisplay = '(none - see blocker below)'
if ($result.recordingStudioPath) { $studioDisplay = $result.recordingStudioPath }

$handoffDisplay = '(none - see blocker below)'
if ($result.creatorHandoffPath) { $handoffDisplay = $result.creatorHandoffPath }

Write-Host ("Review status:              {0}" -f $result.reviewStatus)
Write-Host ("Shani status:                pending (only you change this)")
Write-Host ("Package path:               {0}" -f $result.packagePath)
Write-Host ("Production path:            {0}" -f $productionDisplay)
Write-Host ("Filming guide:               {0}" -f $handoffDisplay)
Write-Host ("Recording Studio:           {0}" -f $studioDisplay)
Write-Host ("Files generated:            {0}" -f $filesDisplay)
Write-Host ("Manual recordings required: {0}" -f $recordingsDisplay)
if ($result.blocker) {
  Write-Host ("Blocker:                     {0}" -f $result.blocker) -ForegroundColor Yellow
} else {
  Write-Host ("Blocker:                     none") -ForegroundColor Green
}
Write-Host ""

switch ($result.status) {
  'ready' {
    if ($result.reviewStatus -eq 'approved' -and $result.creatorHandoffPath -and (Test-Path $result.creatorHandoffPath)) {
      # Creator Handoff (CREATOR-HANDOFF.md) is the PRIMARY handoff for this
      # headless run mode: a `claude -p` process has no open conversation to
      # post a final chat message into, so this simple Hebrew filming guide
      # file is what Shani should see first - not a technical report, not
      # the Recording Studio. It always opens first if present.
      Write-Host "Approved and produced. Opening the filming guide..." -ForegroundColor Green
      Start-Process $result.creatorHandoffPath
      if ($result.recordingStudioPath -and (Test-Path $result.recordingStudioPath)) {
        Write-Host "Also opening the Recording Studio..." -ForegroundColor Green
        Start-Process $result.recordingStudioPath
      }
    } elseif ($result.reviewStatus -eq 'approved' -and $result.recordingStudioPath -and (Test-Path $result.recordingStudioPath)) {
      # Filming guide missing (e.g. creator_handoff.py failed) but the
      # Recording Studio exists - fall back to it rather than a raw folder.
      Write-Host "Approved and produced. Filming guide unavailable - opening the Recording Studio instead..." -ForegroundColor Yellow
      Start-Process $result.recordingStudioPath
    } elseif ($result.reviewStatus -eq 'approved' -and $result.productionPath -and (Test-Path $result.productionPath)) {
      Write-Host "Approved and produced. Opening the production folder..." -ForegroundColor Green
      Start-Process explorer.exe $result.productionPath
    } elseif ($result.packagePath -and (Test-Path $result.packagePath)) {
      Write-Host "Package is ready but needs your decision (Review status: $($result.reviewStatus)). Opening the package folder for you..." -ForegroundColor Yellow
      Start-Process explorer.exe $result.packagePath
    }
  }
  default {
    Write-Host "The run did not complete successfully (status: $($result.status)). Nothing to open." -ForegroundColor Red
  }
}

Write-Host ""
Read-Host "Press Enter to close"
