When running the vite dev server for Marko/run via `npm run dev` I'm noticing function calls from +handler.ts files are not able to reference class instances declared in the root index.ts file. 

In this example (using express and socket.io) the io instance in [socket.ts](./src/socket.ts) first gets intialized by the call to `initSocketServer` in [index.ts](./src/index.ts), then when referenced by the call to `emitToSocket` in [+handler.ts](./src/routes/_index/handler.ts) the following TypeError is thrown due to io being undefined: 
```
TypeError: Cannot read properties of undefined (reading 'emit')
    at Module.emitToSocket (/Users/colin/Projects/marko-run-vite-issue/src/socket.ts:12:6)
    at GET (/Users/colin/Projects/marko-run-vite-issue/src/routes/_index/+handler.ts:6:25)
    at Module.call (/Users/colin/Projects/marko-run-vite-issue/node_modules/@marko/run/dist/runtime/internal.js:56:24)
    at Object.get1 [as handler] (/Users/colin/Projects/marko-run-vite-issue/__marko-run__route._index.js:18:31)
    at invoke (@marko/run/router:33:33)
    at Object.fetch (@marko/run/router:53:18)
    at eval (/Users/colin/Projects/marko-run-vite-issue/node_modules/@marko/run-adapter-node/dist/middleware.js:78:55)
    at file:///Users/colin/Projects/marko-run-vite-issue/node_modules/@marko/run/dist/adapter/middleware.js:187:24
    at Immediate.eval (/Users/colin/Projects/marko-run-vite-issue/node_modules/@marko/run-adapter-node/dist/middleware.js:67:9)
```

I suspect this means to the entrypoint file and the route handlers are being run in different contexts in a dev environment. 
This is not an issue when running a production build. (`npm run build` -> `npm run preview`)
