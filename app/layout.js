import { Inter } from "next/font/google";
import "./globals.css";
import Header from './(components)/header';
import Footer from './(components)/footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KeepMeCompany",
  description: "Improve your GP Practice with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main style={{ paddingTop: '8vh' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
