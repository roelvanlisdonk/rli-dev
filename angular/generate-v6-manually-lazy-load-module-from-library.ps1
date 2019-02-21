


# Angular v6.2.9 cli is used to generate the "manually-lazy-load-module" application.
npm install -g  @angular/cli@6.2.9


$wokspaceFolder = "C:\Dev\rli-dev\angular\v6\manually-lazy-load-module-from-library"
$skeletonFolder = "$wokspaceFolder\skeleton"


# When the folder already exists, you can remove it fast, by first closing Visual Studio Code and any Explorer pointing to the folder.
# Then open a admin powershell and run:
Remove-Item -Path "$wokspaceFolder" -Recurse -Force


mkdir "$wokspaceFolder" > $null
Set-Location "$wokspaceFolder"
ng new skeleton --routing
Set-Location "$skeletonFolder"
ng generate module wrapper-for-todo-manual-lazy
# Now change the "wrapper-for-todo-manual-lazy" module, so it references "manual-lazy" module from the library "todo".
ng build


# todo library
ng generate library todo --prefix todo
ng generate module manual-lazy --project=todo
ng generate component "manual-lazy/task-list" --export=true --entryComponent=true --module=manual-lazy --project=todo
ng build todo

# Run incremental builds, when the library changes
ng build todo --watch

# Change the AppComponent, so it is able to load a module manualy

# Describes how to dynamically load a component.
# https://www.infragistics.com/community/blogs/b/infragistics/posts/how-to-load-component-dynamically-in-angular


# To test for dynamic adding of routings, just add an angular module to the skeleton app, with one component.
# Then dynamically add one route and make it work. 

Set-Location "C:\Dev\rli-dev\angular\v6\manually-lazy-load-module-from-library\skeleton"
ng generate module dynamic-routing
ng generate component "dynamic-routing/car" --module dynamic-routing

# Moet je voor PBI branch / PIMen?

# To run the application

## Separate terminal - Build the external todo library
Set-Location "C:\Dev\rli-dev\angular\v6\manually-lazy-load-module-from-library\skeleton"
ng build todo
ng build todo --watch

## Separate terminal - Run the skeleton application
Set-Location "C:\Dev\rli-dev\angular\v6\manually-lazy-load-module-from-library\skeleton"
ng serve -o
