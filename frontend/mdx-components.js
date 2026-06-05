import { CardGrid, InfoCard, MdxTable } from "./components/mdx/MdxComponents";
import { CodeTab, CodeTabs } from "./components/mdx/CodeTabs";
import { Lang } from "./components/mdx/LanguageBlock";

export function useMDXComponents(components) {
  return {
    table: MdxTable,
    CardGrid,
    CodeTab,
    CodeTabs,
    InfoCard,
    Lang,
    ...components
  };
}
