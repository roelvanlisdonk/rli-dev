Note:
Always use relative path, from the git root to the package.lock.json

Inside azure-pipelines.yml, add:
task: CacheBeta@0
displayName: Cache NuGet packages
inputs:
key: nuget | Gateway/Platform.Gateway/packages.lock.json
path: \$(NUGET_PACKAGES)

When you encounter the error:
error NU1403: The package Autofac.4.2.1 sha512 validation failed. The package is different than the last restore.

Please execute:
dotnet nuget locals all --clear

See:
https://github.com/NuGet/Home/issues/7427
[Test Failure][repeatable restore] Error NU1403 occurs when enabling ‘RestorePackagesWithLockFile’ after installing PR packages into.NET Core project.
