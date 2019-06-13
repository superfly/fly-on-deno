//import { FetchFunction } from "https://unpkg.com/@fly/edge@0.8.0/lib/fetch";
import { serve } from "https://deno.land/std@v0.3.4/http/server.ts";

let httpResponder: (req: Request) => Promise<any> | undefined;
const fly = {
  http: {
    respondWith: function(fn: (req: Request) => Promise<any>){
      console.log("listening for http")
      httpResponder = fn;
    }
  }
};

//@ts-ignore
(globalThis as any)['fly'] = fly;

export async function main() {
  //console.log("body:", body)
  for await (const r of serve(":8000")) {
    
    if(httpResponder){
      const req = new Request(new URL(r.url, "http://proxy").toString(), {
        body: await r.body(),
        method: r.method,
        headers: r.headers
      })
      const resp = await httpResponder(req);
      r.respond(resp);
    }
  }
}

main();