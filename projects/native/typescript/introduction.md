# Introduction

This application is created with pure TypeScript only.
It just a playground to try out native TypeScript and browser features.

#Resources
The following resources were used to create this application

- Hide generated JavaScript files, map files and \*.d.ts files in vscode explorer:
  https://pradeeploganathan.com/typescript/hiding-js-and-js-map-files-in-vs-code-for-your-typescript-projects/

Reload server side and client side

- We use ts-node-dev to not transpile TypeScript, when code changes.
- https://weblog.west-wind.com/posts/2019/May/18/Live-Reloading-Server-Side-ASPNET-Core-Apps
- We use browser-sync to act as a proxy to the backend and will live reload, when static files change.

* https://code.visualstudio.com/docs/typescript/typescript-tutorial
* https://coderwall.com/p/o9ws2g/why-you-should-always-append-dom-elements-using-documentfragments
  multiple
  - Use document.createDocumentFragment(), when adding multiple elements
  - User document.createElement(), when adding only one element
* https://philipwalton.com/articles/using-native-javascript-modules-in-production-today/
* https://v8.dev/features/modules

Use native TypeScript module hot reload in the browser without browser-sync, live-reload etc.
Used this code to create the websocket on the server and client

- https://itnext.io/hot-reloading-native-es2015-modules-dc54cd8cca01
