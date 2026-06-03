import { notFound } from "next/navigation";
import PageWrapper from "../../../components/layout/PageWrapper";
import ArticlePage from "../../../components/posts/ArticlePage";
import { getPostBySlug, getPostSlugs } from "../../../lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Knowledge Log`,
    description: post.summary
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { default: Content } = await import(`@/content/${slug}.mdx`);

  return (
    <PageWrapper>
      <ArticlePage post={post} Content={Content} />
    </PageWrapper>
  );
}
