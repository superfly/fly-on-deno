export { main } from "./shim.ts";

import { proxy } from "https://unpkg.com/@fly/edge@0.8.0/lib/proxy.js";

const origin = proxy("https://flyio-web-client.netlify.com/", { forwardHostHeader: false });

//@ts-ignore
fly.http.respondWith(origin)