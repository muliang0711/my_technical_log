import { getCategoriesWithCounts } from "../../lib/posts";
import CategoryGrid from "../category/CategoryGrid";
import Hero from "../ui/Hero";
import Section from "../ui/Section";

export default function AboutPage() {
  const focusAreas = getCategoriesWithCounts();

  return (
    <main>
      <Hero title="About This Knowledge Log" compact>
        <p>
          A technical archive documenting software development, infrastructure,
          system design, and debugging notes.
        </p>
      </Hero>
      <Section>
        <div className="about-content prose">
          <h2>Purpose</h2>
          <p>
            This blog serves as a living repository for technical learning.
            Architecture notes, implementation details, operational trade-offs,
            and debugging lessons are documented here so they stay searchable
            and useful over time.
          </p>
          <p>
            The archive is organized as a technical notebook: each log should
            explain a concrete concept, decision, failure mode, or engineering
            pattern clearly enough to revisit later.
          </p>
          <p>
            Writing the logs reinforces understanding and creates a permanent
            record that can be reused during future builds, reviews, and
            troubleshooting sessions.
          </p>
        </div>
      </Section>
      <Section title="Technical Focus">
        <div className="about-content about-focus">
          <CategoryGrid categories={focusAreas} focus />
        </div>
      </Section>
      <Section>
        <div className="about-content prose">
          <h2>Approach</h2>
          <p>
            Each post is written from implementation experience, source reading,
            debugging, or system analysis rather than passive note taking.
          </p>
          <p>
            The goal is to capture the reasoning behind technical choices:
            what problem was being solved, which constraints mattered, what
            failed, and what pattern can be reused.
          </p>
          <p>
            The frontend intentionally shows only software development content.
            Other draft or personal files may remain in the content folder, but
            they are not part of the visible archive.
          </p>
        </div>
      </Section>
    </main>
  );
}
