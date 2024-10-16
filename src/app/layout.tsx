import "./globals.css";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Recursive } from "next/font/google";
import Providers from "./components/Providers"; // react-query provider
import { contructMetadata } from "@/lib/utils";
import Navbar from "./components/Navbar";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react"; // next-auth session provider
import { TooltipProvider } from "@/components/ui/tooltip";

const recursive = Recursive({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900", "1000"],
});

export const metadata = contructMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <Providers>
      <SessionProvider session={session}>
        <html lang="en">
          <body className={`${recursive.className}`}>
            <Navbar />
            <main className="flex grany-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
              <div className="flex-1 flex flex-col h-full">
                <TooltipProvider>{children}</TooltipProvider>
              </div>
              <Footer />
            </main>
            <Toaster />
          </body>
        </html>
      </SessionProvider>
    </Providers>
  );
}
