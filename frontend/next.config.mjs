import createMDX from "@next/mdx";

const nextConfig = {
  devIndicators: false,
  output: "export",
  pageExtensions: ["js", "jsx", "md", "mdx"]
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [
      "remark-gfm",
      "remark-frontmatter",
      ["remark-mdx-frontmatter", { name: "frontmatter" }]
    ],
    rehypePlugins: ["rehype-slug"]
  }
});

export default withMDX(nextConfig);
