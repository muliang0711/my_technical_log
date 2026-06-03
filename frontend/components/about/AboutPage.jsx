import { timeline } from "../../data/content";
import { focusAreas } from "../../lib/categories";
import CategoryGrid from "../category/CategoryGrid";
import Hero from "../ui/Hero";
import Section from "../ui/Section";

export default function AboutPage() {
  return (
    <main>
      <Hero title="About This Knowledge Log" compact>
        <p>
          A personal archive documenting the continuous journey of learning,
          growing, and discovering insights across multiple domains of life.
        </p>
      </Hero>
      <Section>
        <div className="content-narrow prose">
          <h2>Purpose</h2>
          <p>
            This blog serves as a living repository of everything I learn
            throughout life. In our fast-paced world, insights and lessons can
            easily fade from memory. By documenting them here, they become
            permanent, searchable, and available for future reference.
          </p>
          <p>
            More than just a personal notebook, this knowledge log is organized
            and structured to be useful not only to myself but potentially to
            others on similar learning journeys.
          </p>
          <p>
            The act of writing about what I learn serves a dual purpose: it
            reinforces my own understanding through teaching and creates a
            permanent record that can be revisited and built upon over time.
          </p>
        </div>
      </Section>
      <Section title="Areas of Focus">
        <div className="content-narrow">
          <CategoryGrid categories={focusAreas} focus />
        </div>
      </Section>
      <Section title="Learning Journey Timeline">
        <div className="content-narrow timeline">
          {timeline.map(([year, title, copy]) => (
            <div className="timeline-item" key={title}>
              <span className="timeline-year">{year}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <div className="content-narrow prose">
          <h2>Approach to Learning</h2>
          <p>
            My learning philosophy centers on active engagement rather than
            passive consumption. Each post here represents not just something I
            read or heard about, but something I&apos;ve practiced, implemented, or
            deeply contemplated.
          </p>
          <p>
            I believe in the power of cross-domain learning - insights from
            fitness can inform productivity, principles from software development
            can apply to personal finance, and lessons from travel can deepen
            philosophical understanding.
          </p>
          <p>
            The blog is organized by category for easy navigation, but the real
            value often lies in the connections between different domains.
          </p>
        </div>
      </Section>
    </main>
  );
}
