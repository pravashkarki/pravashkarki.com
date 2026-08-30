import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { site } from "../config";

export async function GET(context: APIContext) {
  const posts = (await getCollection("posts", ({ data }) => {
    return data.draft !== true;
  })).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: site.name,
    description: site.description,
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/posts/${post.id}/`,
    })),
  });
}
