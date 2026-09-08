@echo off
setlocal EnableExtensions EnableDelayedExpansion
set "GRADLE_VERSION=8.7"
set "GRADLE_SHA256=544c35d6bd849ae8a5ed0bcea39ba677dc40f49df7d1835561582da2009b961d"
if not defined USERPROFILE set "USERPROFILE=%HOMEDRIVE%%HOMEPATH%"
set "CACHE_BASE=%USERPROFILE%\.gradle\dhad-gradle"
set "INSTALL_DIR=%CACHE_BASE%\gradle-%GRADLE_VERSION%"
set "GRADLE_BIN=%INSTALL_DIR%\bin\gradle.bat"
set "DIST_URL=https://services.gradle.org/distributions/gradle-%GRADLE_VERSION%-bin.zip"
set "ZIP_FILE=%CACHE_BASE%\gradle-%GRADLE_VERSION%-bin.zip"
set "PART_FILE=%ZIP_FILE%.part"

if exist "%GRADLE_BIN%" goto run
where gradle >nul 2>&1
if %ERRORLEVEL% EQU 0 (
  for /f "tokens=2" %%V in ('gradle --version ^| findstr /B "Gradle "') do set "VERSION=%%V"
  if "!VERSION!"=="%GRADLE_VERSION%" (
    gradle %*
    exit /b !ERRORLEVEL!
  )
)

where curl.exe >nul 2>&1 || (echo Error: curl.exe is required.& exit /b 1)
where tar.exe >nul 2>&1 || (echo Error: tar.exe is required.& exit /b 1)
where certutil.exe >nul 2>&1 || (echo Error: certutil.exe is required.& exit /b 1)
if not exist "%CACHE_BASE%" mkdir "%CACHE_BASE%"

set "NEED_DOWNLOAD=1"
if exist "%ZIP_FILE%" (
  for /f "tokens=1" %%H in ('certutil -hashfile "%ZIP_FILE%" SHA256 ^| findstr /R /V "hash CertUtil"') do set "HASH=%%H"
  if /I "!HASH!"=="%GRADLE_SHA256%" set "NEED_DOWNLOAD=0"
)
if "%NEED_DOWNLOAD%"=="1" (
  del /q "%ZIP_FILE%" "%PART_FILE%" >nul 2>&1
  echo Downloading and verifying Gradle %GRADLE_VERSION%...
  curl.exe -L --fail --retry 3 --retry-delay 2 --connect-timeout 20 --max-time 600 "%DIST_URL%" -o "%PART_FILE%"
  if errorlevel 1 exit /b 1
  for /f "tokens=1" %%H in ('certutil -hashfile "%PART_FILE%" SHA256 ^| findstr /R /V "hash CertUtil"') do set "HASH=%%H"
  if /I not "!HASH!"=="%GRADLE_SHA256%" (echo Error: Gradle SHA-256 verification failed.& del /q "%PART_FILE%" >nul 2>&1& exit /b 1)
  move /y "%PART_FILE%" "%ZIP_FILE%" >nul
)

if exist "%INSTALL_DIR%" rmdir /s /q "%INSTALL_DIR%"
tar.exe -xf "%ZIP_FILE%" -C "%CACHE_BASE%"
if not exist "%CACHE_BASE%\gradle-%GRADLE_VERSION%\bin\gradle.bat" (echo Error: incomplete Gradle distribution.& exit /b 1)
move "%CACHE_BASE%\gradle-%GRADLE_VERSION%" "%INSTALL_DIR%" >nul

:run
call "%GRADLE_BIN%" %*
exit /b %ERRORLEVEL%
