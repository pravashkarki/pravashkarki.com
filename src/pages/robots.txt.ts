import type { APIRoute } from "astro";
import { site } from "../config";

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap-index.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
};
