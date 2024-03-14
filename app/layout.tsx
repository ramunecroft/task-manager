import {ModalProvider} from "@/components/modal-provider";
import {Provider} from "@/components/providers";
import {SiteFooter} from "@/components/site-footer";
import {SiteHeader} from "@/components/site-header";
import {Toaster} from "@/components/ui/toaster";
import {fontSans} from "@/lib/fonts";
import {cn} from "@/lib/utils";
import {auth} from "@/auth";
import "@/styles/globals.css";
import type {Metadata, Viewport} from "next";
import {SessionProvider} from "next-auth/react";

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

export default async function RootLayout({children}: Readonly<RootLayoutProps>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
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
    </SessionProvider>
  );
}