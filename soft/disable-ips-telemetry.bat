@echo off

echo Disabling telemetry via Group Policies
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f

echo Adding telemetry domains to hosts file
set "hosts_file=%windir%\System32\drivers\etc\hosts"
echo. >> "%hosts_file%"

echo 0.0.0.0 134.170.30.202 >> "%hosts_file%"
echo 0.0.0.0 137.116.81.24 >> "%hosts_file%"
echo 0.0.0.0 157.56.106.189 >> "%hosts_file%"
echo 0.0.0.0 184.86.53.99 >> "%hosts_file%"
echo 0.0.0.0 2.22.61.43 >> "%hosts_file%"
echo 0.0.0.0 2.22.61.66 >> "%hosts_file%"
echo 0.0.0.0 204.79.197.200 >> "%hosts_file%"
echo 0.0.0.0 23.218.212.69 >> "%hosts_file%"
echo 0.0.0.0 65.39.117.230 >> "%hosts_file%"
echo 0.0.0.0 65.52.108.33 >> "%hosts_file%"
echo 0.0.0.0 65.55.108.23 >> "%hosts_file%"
echo 0.0.0.0 64.4.54.254 >> "%hosts_file%"

echo 0.0.0.0 8.36.80.197 >> "%hosts_file%"
echo 0.0.0.0 8.36.80.224 >> "%hosts_file%"
echo 0.0.0.0 8.36.80.252 >> "%hosts_file%"
echo 0.0.0.0 8.36.113.118 >> "%hosts_file%"
echo 0.0.0.0 8.36.113.141 >> "%hosts_file%"
echo 0.0.0.0 8.36.80.230 >> "%hosts_file%"
echo 0.0.0.0 8.36.80.231 >> "%hosts_file%"
echo 0.0.0.0 8.36.113.126 >> "%hosts_file%"
echo 0.0.0.0 8.36.80.195 >> "%hosts_file%"
echo 0.0.0.0 8.36.80.217 >> "%hosts_file%"
echo 0.0.0.0 8.36.80.237 >> "%hosts_file%"
echo 0.0.0.0 8.36.80.246 >> "%hosts_file%"
echo 0.0.0.0 8.36.113.116 >> "%hosts_file%"
echo 0.0.0.0 8.36.113.139 >> "%hosts_file%"
echo 0.0.0.0 8.36.80.244 >> "%hosts_file%"
echo 0.0.0.0 216.228.121.209 >> "%hosts_file%"

echo Blocking telemetry IPs in Windows Firewall
netsh advfirewall firewall delete rule name="Block Telemetry IPs" >nul 2>&1
netsh advfirewall firewall add rule name="Block Telemetry IPs" dir=out action=block remoteip=134.170.30.202,137.116.81.24,157.56.106.189,184.86.53.99,2.22.61.43,2.22.61.66,204.79.197.200,23.218.212.69,65.39.117.230,65.52.108.33,65.55.108.23,64.4.54.254,8.36.80.197,8.36.80.224,8.36.80.252,8.36.113.118,8.36.113.141,8.36.80.230,8.36.80.231,8.36.113.126,8.36.80.195,8.36.80.217,8.36.80.237,8.36.80.246,8.36.113.116,8.36.113.139,8.36.80.244,216.228.121.209

echo Disabling scheduled telemetry tasks
schtasks /change /tn "\Microsoft\Windows\Application Experience\Microsoft Compatibility Appraiser" /disable >nul
schtasks /change /tn "\Microsoft\Windows\Application Experience\ProgramDataUpdater" /disable >nul
schtasks /change /tn "\Microsoft\Windows\Application Experience\StartupAppTask" /disable >nul
schtasks /change /tn "\Microsoft\Windows\Application Experience\PcaPatchDbTask" /disable >nul

exit
