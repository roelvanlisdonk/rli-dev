This post assumes you have an Angular application consuming multiple npm

# Npm link

If you have an Angular application in one repository and an Angular library in an other repository, then you can use npm link to run the Angular application locally using the local code from the Angular library.
The steps to do this are:

- Change directory to the directory inside the Angular library repository, that contains the package.json and run:
  npm ci
  ng build
- Change directory to the generated dist directory or one of its subdirectories that contain the package.json
  Open the package.json and check the "name" property e.g. { name: "@MyCompany/my-lib-1" } and execute
  npm link
- Open the
- Change directory to the directory inside the Angular application repository, that contains the package.json and run:
  npm ci
  npm link @my-company/my-lib-1
  ng serve --open

**Downfalls**
Now a browser will open and you will see the Angular application using the local code from the Angular library repository, but this has some downfalls.
When you make a change to the code inside the Angular library it will only be visible: - if you stop the ng serve - rebuild the Angular library - run ng serve again

- A complete build of the Angular library is needed

# Symlink

What if we don't want to stop the ng serve and use incremental builds of the Angular library?
Well then we can use symlinks on Linux, Mac and Windows, by using the npm package symlink-dir and add some paths to the tsconfig.json => compilerOptions => paths
This will "virtually" mount the code inside the Angular library repository to a directory inside the Angular application, so Angular ng serve, treats the Angular library code as code from the Angular application itself.

This way ng serve can be kept running and makes an incremental build of the Angular library, when you make a change to the code.
The browser will refresh within seconds, when you make a code change instead of minutes, when using npm link.

NOTES

- Before ng serve will use the paths inside the tsconfig.json the Angular library should be removed from the node_modules directory. To this I use a npm script and another npm package "rimraf".
- You have to be careful with scss and TypeScript imports, never use ../../node_modules to refer to npm packages inside the node_modules folder.
  If you have a folder like node_modules/@my-company/my-lib1 and want to import scss from this library, use @import "@my-company/my-lib1/my-scss-variables";
  This also means that, when you symlink code inside the "projects" directory in the Angular application, you should do it with the same names, so
  projects/@my-company/my-lib1 should link to the Angular library source code directory.

Example project
cd
