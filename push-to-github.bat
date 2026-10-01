@echo off
setlocal
cd /d "%~dp0"
set LOG=%~dp0push-log.txt
echo === %date% %time% > "%LOG%"

rem Find git: system git first, then the copy bundled with GitHub Desktop.
set "GIT=git"
where git >nul 2>&1
if errorlevel 1 (
  for /d %%D in ("%LOCALAPPDATA%\GitHubDesktop\app-*") do if exist "%%D\resources\app\git\cmd\git.exe" set "GIT=%%D\resources\app\git\cmd\git.exe"
)
echo Using git: %GIT% >> "%LOG%"

"%GIT%" status --porcelain --untracked-files=no > "%TEMP%\pb-status.txt" 2>>"%LOG%"
for %%A in ("%TEMP%\pb-status.txt") do if %%~zA gtr 0 (
  echo STOP: you have uncommitted changes. Nothing was changed. >> "%LOG%"
  type "%TEMP%\pb-status.txt" >> "%LOG%"
  goto done
)

echo --- fetch >> "%LOG%"
"%GIT%" fetch redesign.bundle redesign-and-fixes:redesign-and-fixes >> "%LOG%" 2>&1 || goto done
echo --- checkout >> "%LOG%"
"%GIT%" checkout redesign-and-fixes >> "%LOG%" 2>&1 || goto done
echo --- push >> "%LOG%"
"%GIT%" push -u origin redesign-and-fixes >> "%LOG%" 2>&1
if errorlevel 1 (echo PUSH FAILED >> "%LOG%") else (echo PUSH OK >> "%LOG%")
del redesign.bundle

:done
"%GIT%" log --oneline -3 >> "%LOG%" 2>&1
"%GIT%" status -sb >> "%LOG%" 2>&1
type "%LOG%"
echo.
echo Xong. Ban co the dong cua so nay.
pause
