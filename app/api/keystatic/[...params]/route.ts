import { makeRouteHandler } from "@keystatic/next/route-handler";
import keystaticConfig from "../../../../keystatic.config";

const { POST: ksPOST, GET: ksGET } = makeRouteHandler({
  config: keystaticConfig,
});

function rewriteHostname(request: Request) {
  const url = new URL(request.url);
  if (process.env.HOST_OVERRIDE) {
    url.hostname = process.env.HOST_OVERRIDE;
    url.protocol = "https";
    url.port = "443";
  }

  return new Request(url.toString(), request);
}

export function GET(request: Request) {
  return ksGET(rewriteHostname(request));
}

export function POST(request: Request) {
  return ksPOST(rewriteHostname(request));
}
