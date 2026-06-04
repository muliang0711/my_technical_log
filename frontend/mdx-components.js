import { CardGrid, InfoCard, MdxTable } from "./components/mdx/MdxComponents";
import { Lang } from "./components/mdx/LanguageBlock";

export function useMDXComponents(components) {
  return {
    table: MdxTable,
    CardGrid,
    InfoCard,
    Lang,
    ...components
  };
}
