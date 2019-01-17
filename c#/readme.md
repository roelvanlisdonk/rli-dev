# Description
This .NET Core C# unit test project is just created to spike some C# code.

I created this project by executing the following tasks:

## Install chocolatey:
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Update chocolatey
choco upgrade chocolatey

# Install .Net Core
choco install dotnetcore-sdk

Note packages can be found at: https://chocolatey.org/packages

# Create folder
Created a folder to contain the .NET Core C# unit test project
md "C:\Dev\GitHub\roelvanlisdonk\dev\C#\core\test"

# Create project
dotnet new mstest

# Continuously run tests
Set-Location "C:\Dev\GitHub\roelvanlisdonk\dev\C#\core\test"
dotnet build
dotnet watch msbuild /t:Test

# EntityFramework Core
To install EntityFramework Cor:
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
