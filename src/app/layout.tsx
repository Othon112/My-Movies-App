import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  Header  from "@/components/Header/Header";
import { GuestSessionProvider } from "@/providers/guestSessionContext";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-black to-blue-900 min-h-screen">
        <GuestSessionProvider>
          <Header />
          <main>{children}</main>
        </GuestSessionProvider>
      </body>
    </html>
  );
}
