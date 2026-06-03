import CategoryCard from "./CategoryCard";

export default function CategoryGrid({ categories, focus = false }) {
  return (
    <div className="grid grid--3">
      {categories.map((category) => (
        <CategoryCard key={category.name} category={category} focus={focus} />
      ))}
    </div>
  );
}
