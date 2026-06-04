"use client";

import { useMemo, useState } from "react";

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
  const activeHeadings = headings?.[language]?.length > 0 ? headings[language] : headings?.en ?? [];

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
            <a href={`#${heading.id}`} key={heading.id}>{heading.text}</a>
          ))}
        </aside>
      </div>
    </>
  );
}
