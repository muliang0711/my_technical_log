export default function ArticleContent({ Content, headings }) {
  return (
    <section className="section">
      <div className="container article-layout">
        <article className="prose">
          <Content />
        </article>
        <aside className="toc">
          <h3>Contents</h3>
          {headings.map((heading) => (
            <a href={`#${heading.id}`} key={heading.id}>{heading.text}</a>
          ))}
        </aside>
      </div>
    </section>
  );
}
