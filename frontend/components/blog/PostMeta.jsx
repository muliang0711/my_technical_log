import { Calendar, Clock } from "lucide-react";

export default function PostMeta({ post, withCategory = false }) {
  return (
    <div className="meta-line">
      {withCategory ? post.category ? <span>{post.category.name}</span> : null : null}
      <Calendar size={14} />
      <span>{post.date}</span>
      <span className="dot" />
      <Clock size={14} />
      <span>{post.readTime}</span>
    </div>
  );
}
