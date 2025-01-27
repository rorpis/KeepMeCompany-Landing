import { Inter } from "next/font/google";
import "./globals.css";
import crypto from 'crypto';
import { logScriptHashes } from './utils/cspHash';

const inter = Inter({ subsets: ["latin"] });

// Collect all your inline scripts here
const inlineScripts = [
  // Add your inline scripts here as strings
  `window.dataLayer = window.dataLayer || [];`,
  // Add more inline scripts...
];

// Only log in development
if (process.env.NODE_ENV === 'development') {
  logScriptHashes(inlineScripts);
}

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
        <meta property="next-script-nonce" content={nonce} />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
} 