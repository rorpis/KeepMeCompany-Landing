import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from 'next/headers';
import crypto from 'crypto';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const nonce = crypto.randomBytes(16).toString('base64');
  
  return (
    <html suppressHydrationWarning>
      <head>
        <meta property="csp-nonce" content={nonce} />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
} 