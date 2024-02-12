import {Provider} from "@/components/providers";
import {SiteHeader} from "@/components/site-header";
import type {Metadata, Viewport} from "next";
import "@/styles/globals.css";
import {cn} from "@/lib/utils";
import {fontSans} from "@/lib/fonts";
import {SiteFooter} from "@/components/site-footer";
import {QueryProvider} from "@/components/provider";
import getDomain from "@/lib/get-domain";

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

const domain = getDomain();

console.log("processenv", process.env);

console.log("domain", domain);

export default function RootLayout({children}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.className
        )}>
        <QueryProvider>
          <Provider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <div vaul-drawer-wrapper="">
              <div className="relative flex min-h-screen flex-col bg-background">
                <SiteHeader />
                <main className="flex-1 items-center justify-center overflow-auto">
                  {children}
                </main>
                <SiteFooter />
              </div>
            </div>
          </Provider>
        </QueryProvider>
      </body>
    </html>
  );
}
