import ArticleContent from "../blog/ArticleContent";
import ArticleHeader from "../blog/ArticleHeader";
import PostList from "../blog/PostList";
import Section from "../ui/Section";
import { getAllPosts } from "../../lib/posts";

export default function ArticlePage({ post, Content }) {
  const posts = getAllPosts();
  const related = posts.filter((item) => item.category.slug === post.category.slug && item.slug !== post.slug);

  return (
    <main>
      <ArticleHeader post={post} />
      <ArticleContent Content={Content} headings={post.headings} />
      <Section title="Related Posts">
        <div className="related-posts">
          <PostList posts={related} columns={3} />
        </div>
      </Section>
    </main>
  );
}
