import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import satori from "satori";
import sharp from "sharp";
import { site } from "../../config";

const fontRegular = await readFile(
  join(process.cwd(), "src/assets/fonts/inter-400.ttf")
);
const fontBold = await readFile(
  join(process.cwd(), "src/assets/fonts/inter-700.ttf")
);

export const getStaticPaths = (async () => {
  const posts = await getCollection("posts", ({ data }) => {
    return data.draft !== true;
  });
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title, description: post.data.description },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { title, description } = props;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          backgroundColor: "#f5f3ef",
          color: "#2a2520",
          fontFamily: "Inter",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                fontSize: "28px",
                opacity: 0.5,
                marginBottom: "24px",
              },
              children: site.name,
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: title.length > 40 ? "48px" : "56px",
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: "24px",
              },
              children: title,
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: "24px",
                opacity: 0.6,
                lineHeight: 1.4,
              },
              children: description,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: fontRegular, weight: 400, style: "normal" },
        { name: "Inter", data: fontBold, weight: 700, style: "normal" },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
