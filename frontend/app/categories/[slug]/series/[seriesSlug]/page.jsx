import { notFound } from "next/navigation";
import PageWrapper from "../../../../../components/layout/PageWrapper";
import SeriesDetailPage from "../../../../../components/series/SeriesDetailPage";
import { getCategoryBySlug } from "../../../../../lib/categories";
import {
  getCategoriesWithCounts,
  getCategorySeriesBySlug,
  getPostsByCategoryAndSeriesSlug,
  getSeriesByCategorySlug
} from "../../../../../lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategoriesWithCounts().flatMap((category) =>
    getSeriesByCategorySlug(category.slug).map((series) => ({
      slug: category.slug,
      seriesSlug: series.slug
    }))
  );
}

export async function generateMetadata({ params }) {
  const { slug, seriesSlug } = await params;
  const category = getCategoryBySlug(slug);
  const series = getCategorySeriesBySlug(slug, seriesSlug);

  if (!category || !series) {
    return {};
  }

  return {
    title: `${series.title} | ${category.name} | Knowledge Log`,
    description: `${series.count} logs in ${category.name} / ${series.title}.`
  };
}

export default async function Page({ params }) {
  const { slug, seriesSlug } = await params;
  const category = getCategoryBySlug(slug);
  const series = getCategorySeriesBySlug(slug, seriesSlug);

  if (!category || !series) {
    notFound();
  }

  return (
    <PageWrapper>
      <SeriesDetailPage
        series={series}
        posts={getPostsByCategoryAndSeriesSlug(slug, seriesSlug)}
        backHref={`/categories/${slug}`}
        backLabel={`${category.name} series`}
      />
    </PageWrapper>
  );
}
