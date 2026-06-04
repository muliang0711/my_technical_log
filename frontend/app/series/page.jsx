import PageWrapper from "../../components/layout/PageWrapper";
import SeriesPage from "../../components/series/SeriesPage";

export const metadata = {
  title: "Series | Knowledge Log",
  description: "Ordered learning paths across related knowledge logs."
};

export default function Page() {
  return (
    <PageWrapper>
      <SeriesPage />
    </PageWrapper>
  );
}
