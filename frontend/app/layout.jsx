import "./globals.css";

export const metadata = {
  title: "Knowledge Log",
  description: "A personal archive of learning and discovery.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
