import { getCategoriesWithCounts } from "../../lib/posts";
import CategoryGrid from "../category/CategoryGrid";
import Hero from "../ui/Hero";
import Section from "../ui/Section";

export default function CategoriesPage() {
  const categories = getCategoriesWithCounts();

  return (
    <main>
      <Hero title="All Categories" compact>
        <p>
          Explore the visible technical categories used by the software
          development log archive.
        </p>
      </Hero>
      <Section tall>
        <CategoryGrid categories={categories} />
      </Section>
    </main>
  );
}
