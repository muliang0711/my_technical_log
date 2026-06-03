import ArticleContent from "../blog/ArticleContent";
import ArticleHeader from "../blog/ArticleHeader";

export default function ArticlePage({ post, Content }) {
  return (
    <main>
      <ArticleHeader post={post} />
      <ArticleContent Content={Content} headings={post.headings} />
    </main>
  );
}
