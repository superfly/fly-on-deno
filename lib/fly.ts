import { FetchFunction } from "https://unpkg.com/@fly/edge@0.8.0/lib/fetch.js";

let httpResponder: FetchFunction | undefined;
export const fly = {
  http: {
    respondWith: function(fn: FetchFunction){
      httpResponder = fn;
    }
  }
}