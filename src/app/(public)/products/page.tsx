import ProductCard from "@/components/card/ProductCard";
import request from "@/server";
import { Products } from "@/types/products";
import { Container } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vodiy Parfum | All Products",
  description: "Vodiy Parfum | All Porducts shapmun, sovun",
};

async function getProducts() {
  const { data } = await request.get<{ total: number; products: Products[] }>(
    "product"
  );

  return data;
}

const AllProductsPage = async () => {
  const data: { total: number; products: Products[] } = await getProducts();

  return (
    <section className="py-20">
      <Container maxWidth="xl">
        <h1 className="my-10 text-3xl font-bold">Barcha mahsulotlar({data.total})</h1>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data.products?.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AllProductsPage;
