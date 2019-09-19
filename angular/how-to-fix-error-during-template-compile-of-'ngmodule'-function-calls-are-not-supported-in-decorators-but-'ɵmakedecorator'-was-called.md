If you get the error:

BUILD ERROR
Error during template compile of 'NgModule' Function calls are not supported in decorators but 'ɵmakeDecorator' was called.

and you are using npm link, please check the angular compiler options and make sure the "preserveSymlinks" is set to true

"angularCompilerOptions": {
"preserveSymlinks": true
...
}
