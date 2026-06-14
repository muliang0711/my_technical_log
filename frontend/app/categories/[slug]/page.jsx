import { notFound } from "next/navigation";
import CategoryDetailPage from "../../../components/categories/CategoryDetailPage";
import PageWrapper from "../../../components/layout/PageWrapper";
import { getCategoryBySlug } from "../../../lib/categories";
import { getCategoriesWithCounts, getPostsByCategorySlug, getSeriesByCategorySlug } from "../../../lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategoriesWithCounts().map((category) => ({ slug: category.slug }));
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
      <CategoryDetailPage
        category={category}
        posts={getPostsByCategorySlug(slug)}
        series={getSeriesByCategorySlug(slug)}
      />
    </PageWrapper>
  );
}
