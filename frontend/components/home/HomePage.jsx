import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContributionActivity } from "../../lib/contributions";
import { getTechnicalPosts } from "../../lib/posts";
import PostList from "../blog/PostList";
import ContributionGraph from "./ContributionGraph";
import Hero from "../ui/Hero";
import Section from "../ui/Section";

export default function HomePage() {
  const posts = getTechnicalPosts();
  const recentPosts = posts.slice(0, 4);
  const activity = getContributionActivity();

  return (
    <main>
      <Hero
        title="Technical Knowledge Log"
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
          A focused archive of software development notes, architecture decisions,
          infrastructure concepts, debugging records, and system design trade-offs.
        </p>
      </Hero>
      <ContributionGraph activity={activity} />
      <Section
        title="Recent Posts"
        action={<Link className="view-link" href="/logs">View all logs -&gt;</Link>}
      >
        <PostList posts={recentPosts} columns={2} />
      </Section>
    </main>
  );
}
