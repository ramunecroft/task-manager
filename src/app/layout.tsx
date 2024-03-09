import {ModalProvider} from "@/components/modal-provider";
import {Provider} from "@/components/providers";
import {SiteFooter} from "@/components/site-footer";
import {SiteHeader} from "@/components/site-header";
import {Toaster} from "@/components/ui/toaster";
import {fontSans} from "@/lib/fonts";
import {cn} from "@/lib/utils";
import "@/styles/globals.css";
import type {Metadata, Viewport} from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const viewport: Viewport = {
  themeColor: [
    {media: "(prefers-color-scheme: light)", color: "white"},
    {media: "(prefers-color-scheme: dark)", color: "black"},
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({children}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.className
        )}>
        <Provider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <div vaul-drawer-wrapper="">
            <div className="relative flex min-h-screen flex-col bg-background">
              <ModalProvider>
                <SiteHeader />
                <main className="flex flex-1 items-center justify-center overflow-auto">
                  <Toaster />
                  {children}
                </main>
                <SiteFooter />
              </ModalProvider>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
