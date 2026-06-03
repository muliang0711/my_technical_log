import Footer from "./Footer";
import Navbar from "./Navbar";

export default function PageWrapper({ children }) {
  return (
    <div className="page-shell">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
