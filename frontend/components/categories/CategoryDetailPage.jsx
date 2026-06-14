import Link from "next/link";
import Hero from "../ui/Hero";
import Section from "../ui/Section";
import SeriesGrid from "../series/SeriesGrid";

export default function CategoryDetailPage({ category, posts, series }) {
  const postLabel = posts.length === 1 ? "post" : "posts";
  const seriesLabel = series.length === 1 ? "series" : "series";

  return (
    <main>
      <Hero title={category.name} compact>
        <p>
          {category.fullDescription}. {posts.length} {postLabel} across {series.length} {seriesLabel}.
        </p>
      </Hero>
      <Section
        title={`${category.name} Series`}
        action={<Link className="view-link" href="/categories">{"<-"} All categories</Link>}
        tall
      >
        {series.length > 0 ? (
          <SeriesGrid
            series={series}
            getHref={(item) => `/categories/${category.slug}/series/${item.slug}`}
          />
        ) : (
          <div className="empty-state">
            <h3>No series yet</h3>
            <p>Add MDX files in this category and rebuild the site.</p>
          </div>
        )}
      </Section>
    </main>
  );
}
