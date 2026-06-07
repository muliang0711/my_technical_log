import Link from "next/link";

export default function SeriesBadge({ series, linked = true }) {
  if (!series) {
    return null;
  }

  if (!linked) {
    return (
      <span className="series-badge">
        {series.title}
      </span>
    );
  }

  return (
    <Link className="series-badge" href="/series">
      {series.title}
    </Link>
  );
}
