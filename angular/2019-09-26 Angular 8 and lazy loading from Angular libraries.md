NOTE: From the Angular team:
libraries should not have route declarations. Routing and lazy loading is meant not be used at application level.
https://github.com/angular/angular/issues/31893#issuecomment-516615243
strictMetadataEmit is a flag for libraries, which shouldn't have any lazy loaded modules at all. It's not meant to be used for applications.

Error: You must set "output.dir" instead of "output.file" when generating multiple chunks.
https://github.com/ng-packagr/ng-packagr/issues/1285

Lazy loading Angular modules with the router within a project can be done like:
https://angular.io/guide/lazy-loading-ngmodules

Lazy

https://github.com/angular/angular-cli/issues/14763

When you want to lazy load a Angular module from an Angular library, without using the router, but want to use the import(...).then(...) syntax, you can use:

import(/_ webpackChunkName: "my-lib" _/ 'my-lib')
.then((mod) => mod.MyLibModule)
.then((loadedModule) => {
if (loadedModule instanceof NgModuleFactory) {
loadedModule.create(this.injector);
} else {
const factory = this.compiler.compileModuleSync(loadedModule);
factory.create(this.injector);
}
});

NOTE: Only the code from the 'MyLibModule' will be put in the chunk, any module not referenced by 'MyLibModule' but in the 'my-lib' package won't get into the chunk, this is a good thing!.

This will work in production build and development build, also with IVY and the angular library may come from the "node_modules" folder.
See: https://github.com/angular/angular/issues/31886

Lazy loading a Angular library from within the "node_modules" folder, without creating wrappers and with the router and with the new import(...).then(...) is possible.

# Angular 8 application

## app-routing.module.ts

The App router should have the syntax:

```
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
path: 'lazy',
loadChildren: () => import('my-lib').then((m) => m.MyLibModule)
}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule {}
```

# Angular 8 library within an other git repository

## tsconfig.lib.json:

```
{
"extends": "../../tsconfig.json",
"compilerOptions": {
"outDir": "../../out-tsc/lib",
"target": "es2015",
"preserveSymlinks": true,
"types": [],
"lib": ["dom", "es2018"]
},
"angularCompilerOptions": {
"annotateForClosureCompiler": true,
"skipTemplateCodegen": true,
"strictMetadataEmit": true,
"fullTemplateTypeCheck": true,
"strictInjectionParameters": true,
"enableResourceInlining": true
},
"exclude": ["src/test.ts", "**/*.spec.ts"]
}
```

## my-lib.module.ts

This is a Angular module within an Angular 8 library, that is build and can be found in the application 'node_modules/my-lib'

```
import { NgModule } from '@angular/core';
import { MyLibComponent } from './my-lib.component';
import { RoutingModule } from './routing.module';

@NgModule({
  declarations: [MyLibComponent],
  imports: [RoutingModule],
  exports: [MyLibComponent]
})
export class MyLibModule {
  constructor() {
  }
}
```

## routing.module.ts

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyLibComponent } from './my-lib.component';

const routes: Routes = [
  {
    path: '',
    component: MyLibComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
```
