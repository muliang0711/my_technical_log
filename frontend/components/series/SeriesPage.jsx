import { getAllSeries } from "../../lib/posts";
import Hero from "../ui/Hero";
import Section from "../ui/Section";
import SeriesGrid from "./SeriesGrid";

export default function SeriesPage() {
  const series = getAllSeries();

  return (
    <main>
      <Hero title="All Series" compact>
        <p>
          Follow ordered learning paths across related logs. Each series keeps posts connected from first concept to next step.
        </p>
      </Hero>
      <Section tall>
        {series.length > 0 ? (
          <SeriesGrid series={series} />
        ) : (
          <div className="empty-state">
            <h3>No series yet</h3>
            <p>Add series metadata to MDX posts and rebuild the site.</p>
          </div>
        )}
      </Section>
    </main>
  );
}
