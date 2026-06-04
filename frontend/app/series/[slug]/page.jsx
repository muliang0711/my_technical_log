import { notFound } from "next/navigation";
import PageWrapper from "../../../components/layout/PageWrapper";
import SeriesDetailPage from "../../../components/series/SeriesDetailPage";
import { getPostsBySeriesSlug, getSeriesBySlug, getSeriesSlugs } from "../../../lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getSeriesSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  if (!series) {
    return {};
  }

  return {
    title: `${series.title} Series | Knowledge Log`,
    description: `${series.count} logs in the ${series.title} series.`
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  if (!series) {
    notFound();
  }

  return (
    <PageWrapper>
      <SeriesDetailPage series={series} posts={getPostsBySeriesSlug(slug)} />
    </PageWrapper>
  );
}
