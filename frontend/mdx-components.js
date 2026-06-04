import { CardGrid, InfoCard, MdxTable } from "./components/mdx/MdxComponents";

export function useMDXComponents(components) {
  return {
    table: MdxTable,
    CardGrid,
    InfoCard,
    ...components
  };
}
