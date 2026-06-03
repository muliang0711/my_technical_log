export default function Hero({ title, children, actions, compact = false }) {
  return (
    <section className={compact ? "hero hero--compact" : "hero"}>
      <div className="container">
        <div className="hero__content">
          <h1>{title}</h1>
          {children}
          {actions ? <div className="hero-actions">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}
