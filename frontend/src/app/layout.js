import Footer from "./components/Footer/Footer";
import Navigation from "./components/Navigation/Navigation";
import "./globals.css";

export const metadata = {
  title: "Eastern CSE Website",
  description: "Loading...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container">
        <header>
          <Navigation />
        </header>
        {children}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
