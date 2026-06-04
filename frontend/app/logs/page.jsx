import PageWrapper from "../../components/layout/PageWrapper";
import LogsPage from "../../components/logs/LogsPage";

export const metadata = {
  title: "All Logs | Knowledge Log",
  description: "Every knowledge log ordered by newest date first."
};

export default function Page() {
  return (
    <PageWrapper>
      <LogsPage />
    </PageWrapper>
  );
}
