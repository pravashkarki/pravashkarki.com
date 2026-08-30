import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "../config";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("posts", ({ data }) => {
    return data.draft !== true;
  })).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const postList = posts
    .map((post) => `- [${post.data.title}](/posts/${post.id}.md): ${post.data.description}`)
    .join("\n");

  const body = `# ${site.name}

> ${site.description}

## Posts

${postList}

## Feeds

- Sitemap: /sitemap-index.xml
- RSS: /rss.xml
- Posts API: /posts.json

## Raw Markdown

Every post is available as raw Markdown at \`/posts/[slug].md\`.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
