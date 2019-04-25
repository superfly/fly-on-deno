import { proxy } from "https://unpkg.com/@fly/edge@0.8.0/lib/proxy.js";
import { serve } from "https://deno.land/std@v0.3.2/http/server.ts";

const origin = proxy("https://flyio-web-client.netlify.com/", { forwardHostHeader: false });
async function main() {
  const resp = await origin("https://fly.io/dashboard/apps");
  const body = await resp.arrayBuffer();
  for await (const req of serve(":8000")) {
    req.respond({ body });
  }
}

main();