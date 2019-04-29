import { Response } from "./lib/response.ts"
import { Request } from "./lib/request.ts";
import { proxy } from "https://unpkg.com/@fly/edge@0.8.0/lib/proxy.js";
//import { proxy } from "../edge/src/proxy.ts";
import { serve } from "https://deno.land/std@v0.3.4/http/server.ts";

//@ts-ignore
(globalThis as any)['Request'] = Request;
//@ts-ignore
(globalThis as any)['Response'] = Response;

const origin = proxy("https://flyio-web-client.netlify.com/", { forwardHostHeader: false });

async function main() {
  //console.log("body:", body)
  for await (const r of serve(":8000")) {
    
    const req = new Request(new URL(r.url, "http://proxy"), {
      body: await r.body(),
      method: r.method,
      headers: r.headers
    })
    console.log("fetching from origin:", r.url, r.method, r.proto)
    const resp = await origin(req);
    r.respond(resp);
  }
}

main();