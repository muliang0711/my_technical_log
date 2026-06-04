import Link from "next/link";
import CategoryBadge from "../category/CategoryBadge";
import SeriesBadge from "../series/SeriesBadge";
import PostMeta from "./PostMeta";

export default function PostCard({ post, wide = false }) {
  return (
    <article className={`card post-card ${wide ? "post-card--wide" : ""}`}>
      <div className="meta-line">
        <CategoryBadge category={post.category} />
        <SeriesBadge series={post.series} />
        <PostMeta post={post} />
      </div>
      <h3>
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h3>
      <p>{post.summary}</p>
      <div className="tag-row">
        {post.tags.map((tag) => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}
