import Header from "./components/header";
import "./globals.css";
export const metadata = {
  title: "ACARE",
  description: "graduation project hoseo CS",
  icons: {
    icon: "/assets/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        <div className="content-container">{children}</div>
      </body>
    </html>
  );
}
