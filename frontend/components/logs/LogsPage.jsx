import { getTechnicalPosts } from "../../lib/posts";
import Hero from "../ui/Hero";
import Section from "../ui/Section";
import PostList from "../blog/PostList";

export default function LogsPage() {
  const posts = getTechnicalPosts();
  const postLabel = posts.length === 1 ? "log" : "logs";

  return (
    <main>
      <Hero title="All Logs" compact>
        <p>
          Browse technical logs ordered by newest date first. {posts.length} {postLabel} published so far.
        </p>
      </Hero>
      <Section title="Logs by Date" tall>
        <PostList posts={posts} columns={2} />
      </Section>
    </main>
  );
}
