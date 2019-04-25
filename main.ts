import { proxy } from "https://unpkg.com/@fly/edge@0.8.0/lib/index.js";

async function main() {
  const body = new TextEncoder().encode("Hello World\n");
  for await (const req of serve(":8000")) {
    req.respond({ body });
  }
}

main();