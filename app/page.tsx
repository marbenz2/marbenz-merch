import Highlights from "@/components/highlights/Highlights";
import Products from "@/components/products/Products";
import Sidebar from "@/components/products/Sidebar";

export default async function Index() {
  return (
    <>
      <main className="flex flex-col gap-4 w-full">
        <Highlights />
        <div className="flex flex-col gap-4 w-full">
          <Sidebar />
          <Products />
        </div>
      </main>
    </>
  );
}
