import { Inter } from "next/font/google";
import "./globals.css";
import crypto from 'crypto';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  // Generate nonce for this request
  const nonce = crypto.randomBytes(16).toString('base64');
  
  // Add nonce to Next.js script tags
  process.env.NEXT_SCRIPT_NONCE = nonce;
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="csp-nonce" content={nonce} />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
} 