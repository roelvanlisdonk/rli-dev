# Generation is based on: https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/angular?view=aspnetcore-3.1&tabs=netcore-cli

# NOTE: do NOT use dashes ("-") in the application name, because else the generated application will not build.
$applicationName = "YoutubeToMp3"
dotnet new angular -o "$($applicationName)"
Set-Location "$($applicationName)"

# Show current value for ASPNETCORE_Environment
$aspNetEnvironment = [Environment]::GetEnvironmentVariable("ASPNETCORE_Environment", "Machine")
Write-Host "Current value for $aspNetEnvironment [$($aspNetEnvironment)]"

# Set ASPNETCORE_Environment to development
[Environment]::SetEnvironmentVariable("ASPNETCORE_Environment", "Development", "Machine")

# Build the spike application
dotnet build

# Run the backend for the spike application
dotnet run
