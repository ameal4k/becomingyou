import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted", // will inject a CSS variable
});



export const metadata: Metadata = {
  title: "Emil's Kaban",
  description: "an app for BecomingYouLabs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${schibsted.variable}  antialiased`}
      >
        <Navbar />
        {children}

        <Footer />
      </body>
    </html>
  );
}
