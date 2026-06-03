import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "../../lib/posts";
import PostList from "../blog/PostList";
import Hero from "../ui/Hero";
import Section from "../ui/Section";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main>
      <Hero
        title="A Personal Archive of Learning and Discovery"
        actions={(
          <>
            <Link className="btn btn--primary" href="/categories">
              Explore Categories <ArrowRight size={16} />
            </Link>
            <Link className="btn" href="/about">About This Blog</Link>
          </>
        )}
      >
        <p>
          Welcome to my knowledge log - a curated collection of insights,
          lessons, and reflections gathered across software development,
          fitness, finance, travel, and life&apos;s continuous journey of growth.
        </p>
      </Hero>
      <Section
        title="Recent Posts"
        action={<Link className="view-link" href="/">View all -&gt;</Link>}
      >
        <PostList posts={posts} columns={2} />
      </Section>
    </main>
  );
}
