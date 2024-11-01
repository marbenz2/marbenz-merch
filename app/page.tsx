import Highlights from "@/components/highlights/Highlights";
import Products from "@/components/products/Products";

export default async function Index() {
  return (
    <>
      <main className="flex flex-col gap-4 w-full">
        <Highlights />
        <Products />
      </main>
    </>
  );
}
