import "./globals.css";

export const metadata = {
  title: "Knowledge Log",
  description: "A technical archive for software development notes.",
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
