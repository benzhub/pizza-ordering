import { ScrollArea, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import NavBar from "./NavBar";
import QueryClientProvider from "./QueryClientProvider";
import StoreProvider from "./StoreProvider";
import AuthProvider from "./auth/Provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pizza Ordering",
  description: "Pizza Ordering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <AuthProvider>
            <StoreProvider>
              <Theme appearance="dark" accentColor="red" grayColor="slate">
                <div className="grid h-screen grid-rows-[auto_1fr_auto]">
                  <div className="fixed top-0 w-full z-50">
                    <NavBar />
                  </div>
                  <ScrollArea type="always" scrollbars="vertical">
                    <main className="overflow-hidden my-24">{children}</main>
                  </ScrollArea>
                  {/* <ThemePanel /> */}
                  <div className="fixed bottom-0 w-full z-50">
                    <Footer />
                  </div>
                </div>
              </Theme>
            </StoreProvider>
          </AuthProvider>
        </QueryClientProvider>
        <Toaster/>
      </body>
    </html>
  );
}
