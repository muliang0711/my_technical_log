export default function Section({ title, action, children, tall = false }) {
  return (
    <section className={tall ? "section section--tall" : "section"}>
      <div className="container">
        {title ? (
          <div className="section-header">
            <h2 className="section-title">{title}</h2>
            {action}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
