import Link from "next/link";
import CategoryBadge from "../category/CategoryBadge";
import PostMeta from "./PostMeta";

export default function PostCard({ post, wide = false }) {
  return (
    <Link className={`card post-card ${wide ? "post-card--wide" : ""}`} href={`/posts/${post.slug}`}>
      <div className="meta-line">
        <CategoryBadge category={post.category} />
        <PostMeta post={post} />
      </div>
      <h3>{post.title}</h3>
      <p>{post.summary}</p>
      <div className="tag-row">
        {post.tags.map((tag) => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>
    </Link>
  );
}
