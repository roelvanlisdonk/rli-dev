
# Create a debuggable .NET Core console application with a debuggable test project.
$appProjectName = "App"
$solutionName = "MyConsoleV1"
$testProjectName = "Test"
$rootFolder = "C:\Dev"

Set-Location "$rootFolder"
$solutionFolder = "$rootFolder\$solutionName"

 # Remove solution folder, if it exists.
If((test-path $solutionFolder))
{
    Remove-Item "$solutionFolder" -Force -Recurse
}

# Create solution folder.
New-Item -ItemType Directory -Force -Path "$solutionFolder"

# Create solution
Set-Location "$solutionFolder"
dotnet new sln -n "$solutionName"

# Create console application project
dotnet new console -n "$appProjectName"

# Add console application project to solution
Set-Location "$solutionFolder"
dotnet sln add "$appProjectName/$appProjectName.csproj"

# Create test project
dotnet new mstest -n "$testProjectName"

# Add console application project as reference to test project
Set-Location "$solutionFolder\$testProjectName"
dotnet add reference "../$appProjectName/$appProjectName.csproj"

# Add test project to solution
Set-Location "$solutionFolder"
dotnet sln add "$testProjectName/$testProjectName.csproj"