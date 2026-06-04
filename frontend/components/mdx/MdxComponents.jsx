export function MdxTable(props) {
  return (
    <div className="mdx-table-wrap">
      <table {...props} />
    </div>
  );
}

export function CardGrid({ children, columns = 2 }) {
  return (
    <div className={`mdx-card-grid mdx-card-grid--${columns}`}>
      {children}
    </div>
  );
}

export function InfoCard({ title, children }) {
  return (
    <section className="mdx-info-card">
      {title ? <h3>{title}</h3> : null}
      <div>{children}</div>
    </section>
  );
}
