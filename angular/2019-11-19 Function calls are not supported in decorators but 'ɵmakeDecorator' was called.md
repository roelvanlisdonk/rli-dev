
If you get the error:


BUILD ERROR
Error during template compile of 'NgModule'
  Function calls are not supported in decorators but 'ɵmakeDecorator' was called.
: Unexpected value '... in ....d.ts' imported by the module '... in ....ts'. Please add a @NgModule annotation.   
: Can't bind to '...' since it isn't a known property of '...'.
If '...' is an Angular component and it has '...' input, then verify that it is part of this module.


And you use npm link, make sure, the compiler option "preserveSymlinks" is set to true, in your tsconfig.json file: 

```
"compilerOptions": {
    "preserveSymlinks": true,
```
