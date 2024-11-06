import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navigation from "@/components/navigation/Navigation";
import { createClient as createServerClient } from "@/utils/supabase/server";
import ClientProvider from "@/components/providers/ClientProvider";
import ShopDataProvider from "@/components/providers/ShopDataProvider";
import {
  getServerBestsellers,
  getServerCategories,
  getServerOrders,
  getServerProducts,
} from "@/utils/supabase/server-queries";
import InfoBar from "@/components/info/InfoBar";
import { Toaster } from "@/components/ui/toaster";
import CartDataProvider from "@/components/providers/CartDataProvider";
import OrderDataProvider from "@/components/providers/OrderDataProvider";
import Footer from "@/components/footer/Footer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: initialProducts } = await getServerProducts();
  const { data: initialCategories } = await getServerCategories();
  const { data: initialBestsellers } = await getServerBestsellers();
  const { data: initialOrders } = user
    ? await getServerOrders(user.id)
    : { data: null };

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
              initialProducts={initialProducts ?? []}
              initialCategories={initialCategories ?? []}
              initialBestsellers={initialBestsellers ?? []}
            >
              <CartDataProvider user={user}>
                <OrderDataProvider
                  user={user}
                  initialOrders={initialOrders ?? []}
                >
                  <Navigation />
                  <InfoBar />
                  <main className="w-full min-h-screen flex flex-col items-center py-12 px-1 md:px-4 lg:px-12">
                    {children}
                  </main>
                  <Footer />
                </OrderDataProvider>
              </CartDataProvider>
            </ShopDataProvider>
          </ClientProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
