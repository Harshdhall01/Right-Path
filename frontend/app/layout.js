import "./globals.css";
import Navbar from "@/components/navbar";
import CustomCursor from "@/components/customcursor";
import SessionProvider from "@/components/sessionprovider";

export const metadata = {
  title: "RightPath — AI JEE Counsellor",
  description: "Find your perfect engineering college with AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;700&family=Google+Sans+Display:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-textPrimary font-sans antialiased">
        <SessionProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}