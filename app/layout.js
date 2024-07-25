import { Inter } from "next/font/google";
import "./globals.css";
import Header from './(components)/header';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KeepMeCompany",
  description: "Your parent will never be alone again",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main style={{ paddingTop: '0vh' }}>{children}</main>
      </body>
    </html>
  );
}
