import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navigation from "@/components/navigation/Navigation";
import { createClient as createServerClient } from "@/utils/supabase/server";
import ClientProvider from "@/components/providers/ClientProvider";
import ShopDataProvider from "@/components/providers/ShopDataProvider";
import {
  getServerBestsellers,
  getServerProducts,
  getServerProductsWithImages,
} from "@/utils/supabase/server-queries";
import { getServerCategories } from "@/utils/supabase/server-queries";
import InfoBar from "@/components/info/InfoBar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: initialProductsWithImages } =
    await getServerProductsWithImages();
  const { data: initialCategories } = await getServerCategories();
  const { data: initialBestsellers } = await getServerBestsellers();

  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientProvider initialUser={user}>
            <ShopDataProvider
              initialProductsWithImages={initialProductsWithImages ?? []}
              initialCategories={initialCategories ?? []}
              initialBestsellers={initialBestsellers ?? []}
            >
              <Navigation />
              <InfoBar />
              <main className="min-h-screen flex flex-col items-center py-12 px-4 lg:px-12">
                {children}
              </main>
            </ShopDataProvider>
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
