import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://autobon.ca'),
  title: "Autobon | The Best Place To Purchase A Car",
  description: "Discover the best dealership to buy, sell, or trade used cars. Get instant approvals, browse top-quality vehicles, and enjoy a seamless experience at Autobon.",
  openGraph: {
    title: "Autobon | The Best Place To Purchase A Car",
    description: "Discover the best dealership to buy, sell, or trade used cars. Get instant approvals, browse top-quality vehicles, and enjoy a seamless experience at Autobon.",
    url: "https://autobon.ca",
    siteName: "Autobon",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Autobon Cover Image",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Autobon | The Best Place To Purchase A Car",
    description: "Discover the best dealership to buy, sell, or trade used cars. Get instant approvals, browse top-quality vehicles, and enjoy a seamless experience at Autobon.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.jpeg",
    shortcut: "/favicon.jpeg",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.jpeg" type="image/jpeg" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ScrollToTop />
          <Header />
          {children}
          <Footer />
          <Chatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
