import Link from "next/link";

export default function SeriesBadge({ series }) {
  if (!series) {
    return null;
  }

  return (
    <Link className="series-badge" href="/series">
      {series.title}
    </Link>
  );
}
