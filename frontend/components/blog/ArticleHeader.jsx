import Link from "next/link";
import { Share2 } from "lucide-react";
import CategoryBadge from "../category/CategoryBadge";
import PostMeta from "./PostMeta";

export default function ArticleHeader({ post }) {
  return (
    <section className="article-hero">
      <div className="container content-narrow">
        <Link className="view-link" href="/categories">{"<-"} Back to {post.category.name}</Link>
        <div className="article-category">
          <CategoryBadge category={post.category} />
        </div>
        <h1 className="article-title">{post.title}</h1>
        <div className="meta-line">
          <PostMeta post={post} />
          <span className="dot" />
          <Share2 size={14} />
          <span>Share</span>
        </div>
        <div className="tag-row article-tags">
          {post.tags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
