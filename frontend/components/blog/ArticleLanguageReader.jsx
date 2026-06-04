"use client";

import { useEffect, useMemo, useState } from "react";

const languageLabels = {
  en: "English",
  zh: "中文"
};

function getAvailableLanguages(headings) {
  const languages = ["en"];

  if (headings?.zh?.length > 0) {
    languages.push("zh");
  }

  return languages;
}

export default function ArticleLanguageReader({ headings, children }) {
  const availableLanguages = useMemo(() => getAvailableLanguages(headings), [headings]);
  const [language, setLanguage] = useState(availableLanguages[0]);
  const activeHeadings = useMemo(
    () => (headings?.[language]?.length > 0 ? headings[language] : headings?.en ?? []),
    [headings, language]
  );
  const [activeHeadingId, setActiveHeadingId] = useState("");

  useEffect(() => {
    if (activeHeadings.length === 0) {
      return undefined;
    }

    const updateActiveHeading = () => {
      const visibleHeadings = activeHeadings
        .map((heading) => document.getElementById(heading.id))
        .filter(Boolean)
        .filter((element) => element.offsetParent !== null);
      const scrollTarget = window.scrollY + 145;

      const currentHeading = visibleHeadings.reduce((current, element) => {
        const documentTop = element.getBoundingClientRect().top + window.scrollY;

        if (documentTop <= scrollTarget) {
          return element;
        }

        return current;
      }, visibleHeadings[0]);

      setActiveHeadingId(currentHeading?.id ?? "");
    };

    updateActiveHeading();
    window.addEventListener("scroll", updateActiveHeading, { passive: true });
    window.addEventListener("resize", updateActiveHeading);

    return () => {
      window.removeEventListener("scroll", updateActiveHeading);
      window.removeEventListener("resize", updateActiveHeading);
    };
  }, [activeHeadings]);

  return (
    <>
      <div className="article-language-toolbar">
        <div className="language-switcher" aria-label="Article language">
          {availableLanguages.map((item) => (
            <button
              className={language === item ? "language-switcher__button language-switcher__button--active" : "language-switcher__button"}
              key={item}
              onClick={() => setLanguage(item)}
              type="button"
            >
              {languageLabels[item]}
            </button>
          ))}
        </div>
      </div>
      <div className="article-language-frame" data-active-lang={language}>
        {children}
        <aside className="toc">
          <h3>Contents</h3>
          {activeHeadings.map((heading) => (
            <a
              aria-current={activeHeadingId === heading.id ? "true" : undefined}
              className={activeHeadingId === heading.id ? "toc__link toc__link--active" : "toc__link"}
              href={`#${heading.id}`}
              key={heading.id}
            >
              {heading.text}
            </a>
          ))}
        </aside>
      </div>
    </>
  );
}
