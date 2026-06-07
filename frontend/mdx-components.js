import { CardGrid, InfoCard, MdxTable } from "./components/mdx/MdxComponents";
import { CodeTab, CodeTabs } from "./components/mdx/CodeTabs";
import { FlowGraph } from "./components/mdx/FlowGraph";
import { Lang } from "./components/mdx/LanguageBlock";

export function useMDXComponents(components) {
  return {
    table: MdxTable,
    CardGrid,
    CodeTab,
    CodeTabs,
    FlowGraph,
    InfoCard,
    Lang,
    ...components
  };
}
