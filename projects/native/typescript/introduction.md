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

# Browser reload on TypeScript change

Use native TypeScript module hot reload in the browser without browser-sync, live-reload etc. Used this code to create the websocket or Eventsource / server sent events on the server and client

- https://itnext.io/hot-reloading-native-es2015-modules-dc54cd8cca01
- https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events

The following link describes server side events working with node and TypeScript
https://github.com/ServiceStackApps/typescript-server-events

# Server side events:

Next link describes how to setup a really simple client and server in TypeScript that uses server side events (EventSource)
https://stackoverflow.com/questions/36249684/simple-way-to-implement-server-sent-events-in-node-js

Next link describers more in detail how server side events work:
https://jasonbutz.info/2018/08/server-sent-events-with-node/

Je kunt dus aan EventSource gewoon een url meegeven van de backend en zolang deze maar een bericht terug stuurt met 'Content-Type': 'text/event-stream' dan werkt het:
app.get('/countdown', function(req, res) {
res.writeHead(200, {
'Content-Type': 'text/event-stream',
'Cache-Control': 'no-cache',
'Connection': 'keep-alive'
})
countdown(res, 10)
})

Client
Dus als de browser start, dan subscribe je op server side events met new EventSource('/reload').

- Als je een event krijgt dan doe je een refresh van de browser

Server
Dan als er iets op de server veranderd, roep je op de server de /reload aan.

Voordelen
Je hebt geen enkele dependency.
Er is zelfs een pollyfill om EventSource te laten werken in browsers die dit niet ondersteunen, maar voor development gebruiken we toch chrome en straks kun je zelf Edge gebruiken.

# Setup vscode

https://medium.com/better-programming/ultimate-typescript-development-configuration-4ecf9f22686

This setup will also use ts-node-dev for debugging so it will be much faster when debugging.
We should only update the launch.config so it use the configured inspect port:
