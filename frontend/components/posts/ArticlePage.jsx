import ArticleContent from "../blog/ArticleContent";
import ArticleHeader from "../blog/ArticleHeader";
import SeriesNavigation from "../series/SeriesNavigation";
import { getSeriesNavigation } from "../../lib/posts";

export default function ArticlePage({ post, Content }) {
  const seriesNavigation = getSeriesNavigation(post);

  return (
    <main>
      <ArticleHeader post={post} />
      <ArticleContent Content={Content} headings={post.headings} />
      <SeriesNavigation navigation={seriesNavigation} />
    </main>
  );
}
