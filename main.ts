import { proxy } from "https://unpkg.com/@fly/edge@0.8.0/lib/index.js";
import { serve } from "https://deno.land/std@v0.3.2/http/server.ts";

async function main() {
  const body = new TextEncoder().encode("Hello World\n");
  for await (const req of serve(":8000")) {
    req.respond({ body });
  }
}

main();