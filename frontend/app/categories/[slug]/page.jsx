import { notFound } from "next/navigation";
import CategoryDetailPage from "../../../components/categories/CategoryDetailPage";
import PageWrapper from "../../../components/layout/PageWrapper";
import { getCategoryBySlug, getCategorySlugs } from "../../../lib/categories";
import { getPostsByCategorySlug } from "../../../lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.name} | Knowledge Log`,
    description: category.fullDescription
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <PageWrapper>
      <CategoryDetailPage category={category} posts={getPostsByCategorySlug(slug)} />
    </PageWrapper>
  );
}
