import Link from "next/link";
import PostList from "../blog/PostList";
import Hero from "../ui/Hero";
import Section from "../ui/Section";

export default function SeriesDetailPage({ series, posts, backHref = "/", backLabel = "Home" }) {
  const postLabel = posts.length === 1 ? "log" : "logs";

  return (
    <main>
      <Hero title={series.title} compact>
        <p>
          {posts.length} {postLabel} in this series, ordered for step-by-step reading.
        </p>
      </Hero>
      <Section
        title={`${series.title} Series`}
        action={<Link className="view-link" href={backHref}>{"<-"} {backLabel}</Link>}
        tall
      >
        {posts.length > 0 ? (
          <PostList posts={posts} columns={2} />
        ) : (
          <div className="empty-state">
            <h3>No posts yet</h3>
            <p>Add MDX files with matching series metadata and rebuild the site.</p>
          </div>
        )}
      </Section>
    </main>
  );
}
