


# Angular v6.2.9 cli is used to generate the "manually-lazy-load-module" application.
npm install -g  @angular/cli@6.2.9


$wokspaceFolder = "C:\Dev\rli-dev\angular\v6\manually-lazy-load-module-from-library"
$skeletonFolder = "$wokspaceFolder\skeleton"


# When the folder already exists, you can remove it fast, by first closing Visual Studio Code and any Explorer pointing to the folder.
# Then open a admin powershell and run:
Remove-Item -Path "$wokspaceFolder" -Recurse -Force


mkdir "$wokspaceFolder" > $null
cd "$wokspaceFolder"
ng new skeleton --routing
cd "$skeletonFolder"
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

cd "C:\Dev\rli-dev\angular\v6\manually-lazy-load-module-from-library\skeleton"
ng serve -o

# Describes how to dynamically load a component.
# https://www.infragistics.com/community/blogs/b/infragistics/posts/how-to-load-component-dynamically-in-angular


