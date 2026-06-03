export default function CategoryBadge({ category }) {
  return (
    <span className={`category-badge ${category.slug}`}>
      {category.name}
    </span>
  );
}
