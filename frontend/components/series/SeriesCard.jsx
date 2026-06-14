import Link from "next/link";
import { ListTree } from "lucide-react";

export default function SeriesCard({ series, href = `/series/${series.slug}` }) {
  const postLabel = series.count === 1 ? "log" : "logs";
  const firstPost = series.posts[0];

  return (
    <Link className="card series-card" href={href}>
      <div className="series-card__icon">
        <ListTree size={22} />
      </div>
      <div>
        <h3>{series.title}</h3>
        <p>
          {series.count} {postLabel} in order
        </p>
        {firstPost ? <span>Start with: {firstPost.title}</span> : null}
      </div>
    </Link>
  );
}
