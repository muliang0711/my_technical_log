import Link from "next/link";
import PostList from "../blog/PostList";
import Hero from "../ui/Hero";
import Section from "../ui/Section";

export default function CategoryDetailPage({ category, posts }) {
  const postLabel = posts.length === 1 ? "post" : "posts";

  return (
    <main>
      <Hero title={category.name} compact>
        <p>
          {category.fullDescription}. {posts.length} {postLabel} in this category.
        </p>
      </Hero>
      <Section
        title={`${category.name} Posts`}
        action={<Link className="view-link" href="/categories">{"<-"} All categories</Link>}
        tall
      >
        {posts.length > 0 ? (
          <PostList posts={posts} columns={2} />
        ) : (
          <div className="empty-state">
            <h3>No posts yet</h3>
            <p>Add an MDX file in this category and rebuild the site.</p>
          </div>
        )}
      </Section>
    </main>
  );
}
