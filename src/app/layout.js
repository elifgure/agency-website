import BrandMarquee from "@/components/BrandMarquee";
import Footer from "../components/Footer";
import Navbar from "../components/Header";
import "./globals.css";
import TalentShowcase from "@/components/TalentShowcase";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        {children}
<BrandMarquee />
<TalentShowcase />
        <Footer />
      </body>
    </html>
  );
}
