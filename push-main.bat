@echo off
cd /d "%~dp0"
set "GIT=git"
where git >nul 2>&1
if errorlevel 1 (
  for /d %%D in ("%LOCALAPPDATA%\GitHubDesktop\app-*") do if exist "%%D\resources\app\git\cmd\git.exe" set "GIT=%%D\resources\app\git\cmd\git.exe"
)
echo Bo lien ket voi repo cu...
"%GIT%" branch --unset-upstream main
"%GIT%" update-ref -d refs/remotes/origin/main
"%GIT%" update-ref -d refs/remotes/origin/HEAD
echo.
echo Day nhanh main len https://github.com/kevint1108/PortfolioBuilder ...
"%GIT%" push -u origin main
echo.
"%GIT%" status -sb
echo.
echo Xong. Ban co the dong cua so nay.
pause
