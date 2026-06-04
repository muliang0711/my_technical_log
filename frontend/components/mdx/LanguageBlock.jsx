export function Lang({ lang, children }) {
  return (
    <div data-lang-block={lang}>
      {children}
    </div>
  );
}
