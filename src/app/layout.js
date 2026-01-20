import Navbar from "./components/Header";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-hidden bg-black text-white">
             <Navbar /> 
        {children}
      </body>
    </html>
  );
}
