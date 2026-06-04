import ArticleLanguageReader from "./ArticleLanguageReader";

export default function ArticleContent({ Content, headings }) {
  return (
    <section className="section">
      <div className="container article-layout">
        <ArticleLanguageReader headings={headings}>
          <article className="prose">
            <Content />
          </article>
        </ArticleLanguageReader>
      </div>
    </section>
  );
}
