import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  viewport: {
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
  }
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
