import Link from "next/link";

export default function CategoryCard({ category, focus = false }) {
  const Icon = category.icon;
  const postLabel = category.posts === 1 ? "post" : "posts";

  if (focus) {
    return (
      <article className="card focus-card">
        <span className={`category-icon category-badge ${category.slug}`}>
          <Icon size={20} />
        </span>
        <h3>{category.name}</h3>
        <p>{category.fullDescription}</p>
      </article>
    );
  }

  const card = (
    <article className="card category-card">
      <span className={`category-icon category-badge ${category.slug}`}>
        <Icon size={22} />
      </span>
      <div>
        <h3>{category.name}</h3>
        <p>{category.description}</p>
        <span>{category.posts} {postLabel}</span>
      </div>
    </article>
  );

  return (
    <Link href={`/categories/${category.slug}`} aria-label={`View ${category.name} posts`}>
      {card}
    </Link>
  );
}
