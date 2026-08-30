import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "../config";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("posts", ({ data }) => {
    return data.draft !== true;
  })).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const data = {
    site: site.name,
    url: site.url,
    posts: posts.map((post) => ({
      title: post.data.title,
      date: post.data.date.toISOString().slice(0, 10),
      description: post.data.description,
      tags: post.data.tags,
      url: `/posts/${post.id}/`,
      markdown: `/posts/${post.id}.md`,
    })),
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
