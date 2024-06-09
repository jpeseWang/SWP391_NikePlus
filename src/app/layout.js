import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "./providers";

export const metadata = {
  title: "Nike Plus. Not at all",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark:bg-[#0C0C0C]">
      <body>
        <Providers>
          <Header />
          {children}

          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
