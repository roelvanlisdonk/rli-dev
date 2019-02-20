
When I was implementing manual lazy loading for a module in a Angular 6 project, I was getting the error:

![](2019-02-20-21-01-06.png)

```
ERROR Error: Uncaught (in promise): Error: Cannot find module 'src/app/wrapper/wrapper.module'
Error: Cannot find module 'src/app/wrapper/wrapper.module'
    at $_lazy_route_resource lazy namespace object:5
    at ZoneDelegate.push../node_modules/zone.js/dist/zone.js.ZoneDelegate.invoke (zone.js:391)
    at Object.onInvoke (core.js:3820)
    at ZoneDelegate.push../node_modules/zone.js/dist/zone.js.ZoneDelegate.invoke (zone.js:390)
    at Zone.push../node_modules/zone.js/dist/zone.js.Zone.run (zone.js:150)
    at zone.js:889
    at ZoneDelegate.push../node_modules/zone.js/dist/zone.js.ZoneDelegate.invokeTask (zone.js:423)
    at Object.onInvokeTask (core.js:3811)
    at ZoneDelegate.push../node_modules/zone.js/dist/zone.js.ZoneDelegate.invokeTask (zone.js:422)
    at Zone.push../node_modules/zone.js/dist/zone.js.Zone.runTask (zone.js:195)
    at resolvePromise (zone.js:831)
    at resolvePromise (zone.js:788)
    at zone.js:892
    at ZoneDelegate.push../node_modules/zone.js/dist/zone.js.ZoneDelegate.invokeTask (zone.js:423)
    at Object.onInvokeTask (core.js:3811)
    at ZoneDelegate.push../node_modules/zone.js/dist/zone.js.ZoneDelegate.invokeTask (zone.js:422)
    at Zone.push../node_modules/zone.js/dist/zone.js.Zone.runTask (zone.js:195)
    at drainMicroTaskQueue (zone.js:601)
```

This was caused by the angular.json file missing an entry in the "lazyModules"

```
"projects" > "your-app-name" > "architect" > "build" > "options" > "lazyModules"
[
	"path/to/wrapper/lazy.module"
]
```
