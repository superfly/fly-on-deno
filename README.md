# Fly apps on Deno

This is a sample Fly app running in Deno. It uses https://github.com/superfly/edge/, which currently fails in various ways we need to fix.

### Module resolution: `index` files

```bash
➜  fly-deno git:(master) deno main.ts
Compiling file:///Users/kurt/code/fly.io/fly-deno/main.ts
Downloading https://unpkg.com/@fly/edge@0.8.0/lib/fetch
Downloading https://unpkg.com/@fly/edge@0.8.0/lib/proxy
Downloading https://unpkg.com/@fly/edge@0.8.0/lib/pipeline
Downloading https://unpkg.com/@fly/edge@0.8.0/lib/middleware
Uncaught Other: Import 'https://unpkg.com/@fly/edge@0.8.0/lib/middleware' failed: 404 Not Found
    at DenoError (js/errors.ts:22:5)
    at maybeError (js/errors.ts:33:12)
    at maybeThrowError (js/errors.ts:39:15)
    at sendSync (js/dispatch.ts:86:5)
    at fetchModuleMetaData (js/os.ts:74:19)
    at _resolveModule (js/compiler.ts:255:38)
    at resolveModuleNames (js/compiler.ts:486:35)
    at compilerHost.resolveModuleNames (third_party/node_modules/typescript/lib/typescript.js:121106:138)
    at resolveModuleNamesWorker (third_party/node_modules/typescript/lib/typescript.js:88311:127)
    at resolveModuleNamesReusingOldState (third_party/node_modules/typescript/lib/typescript.js:88553:24)
```

### npm depencies

Gotta figure out how to handle `@fly/edge` dependencies. The current plan is to vendor them and publish our own lib with no additional dependencies.

```bash
➜  fly-deno git:(master) deno aws.ts
Compiling file:///Users/kurt/code/fly.io/fly-deno/aws.ts
Downloading https://unpkg.com/@fly/edge@0.8.0/lib/backends/aws_s3.js
Downloading https://unpkg.com/@fly/edge@0.8.0/lib/aws
Downloading https://unpkg.com/@fly/edge@0.8.0/lib/aws4
Uncaught Other: Import 'https://unpkg.com/@fly/edge@0.8.0/lib/aws4' failed: 404 Not Found
    at DenoError (js/errors.ts:22:5)
    at maybeError (js/errors.ts:33:12)
    at maybeThrowError (js/errors.ts:39:15)
    at sendSync (js/dispatch.ts:86:5)
    at fetchModuleMetaData (js/os.ts:74:19)
    at _resolveModule (js/compiler.ts:255:38)
    at resolveModuleNames (js/compiler.ts:486:35)
    at compilerHost.resolveModuleNames (third_party/node_modules/typescript/lib/typescript.js:121106:138)
    at resolveModuleNamesWorker (third_party/node_modules/typescript/lib/typescript.js:88311:127)
    at resolveModuleNamesReusingOldState (third_party/node_modules/typescript/lib/typescript.js:88553:24)
```

### Global service worker types

We assume a _lot_ of global types, especially `fetch` related types.

```bash
➜  fly-deno git:(master) ✗ deno proxy.ts
https://unpkg.com/@fly/edge@0.8.0/lib/proxy.js:24:29
        if (!(req instanceof Request)) {
                             ^
Uncaught ReferenceError: Request is not defined
    at proxyFetch (https://unpkg.com/@fly/edge@0.8.0/lib/proxy.js:24:30)
    at main (file:///Users/kurt/code/fly.io/fly-deno/proxy.ts:6:22)
    at file:///Users/kurt/code/fly.io/fly-deno/proxy.ts:13:1
```