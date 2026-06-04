import Link from "next/link";

function SeriesNavCard({ label, post }) {
  if (!post) {
    return <div className="series-nav-card series-nav-card--empty" />;
  }

  return (
    <Link className="series-nav-card" href={`/posts/${post.slug}`}>
      <span>{label}</span>
      <strong>{post.title}</strong>
      <small>{post.readTime}</small>
    </Link>
  );
}

export default function SeriesNavigation({ navigation }) {
  if (!navigation) {
    return null;
  }

  return (
    <section className="section series-navigation-section">
      <div className="container content-narrow">
        <div className="series-navigation">
          <div className="series-navigation-header">
            <div>
              <span>In this series</span>
              <h2>{navigation.series.title}</h2>
            </div>
            <Link className="view-link" href={`/series/${navigation.series.slug}`}>
              View series -&gt;
            </Link>
          </div>
          <p>
            Part {navigation.index} of {navigation.total}. Move between logs in the same learning sequence.
          </p>
          <div className="series-nav-grid">
            <SeriesNavCard label="Previous log" post={navigation.previous} />
            <SeriesNavCard label="Next log" post={navigation.next} />
          </div>
        </div>
      </div>
    </section>
  );
}
