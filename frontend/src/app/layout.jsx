import Footer from "./components/Footer/Footer";
import Navigation from "./components/Navigation/Navigation";
import "./globals.css";
import ClientThemeProvider from "./components/Theme/ClientThemeProvider";
import { GlobalContextProvider } from "@/context/GlobalContext";
import "react-quill/dist/quill.snow.css";

export const metadata = {
  title: "Eastern CSE Website",
  description: "Loading...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GlobalContextProvider>
        <ClientThemeProvider>
          <body>
            <header>
              <Navigation />
            </header>
            <div className="">{children}</div>
            <footer>
              <Footer />
            </footer>
          </body>
        </ClientThemeProvider>
      </GlobalContextProvider>
    </html>
  );
}
