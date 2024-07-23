import { Inter } from "next/font/google";
import "./globals.css"; // Ensure this line is present

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Keep Me Company",
  description: "Your parent will never be alone again",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}