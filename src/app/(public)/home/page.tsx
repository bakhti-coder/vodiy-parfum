import ProductCard from "@/components/card/ProductCard";
import ParallaxComponent from "@/components/parralax";
import request from "@/server";
import { Products } from "@/types/products";
import { Container, Grid } from "@mui/material";
import Link from "next/link";

async function getProducts() {
  const { data } = await request.get<Products[]>("last-products");

  return data;
}

const HomePage = async () => {
  const data: Products[] = await getProducts();

  return (
    <main>
      <section>
        <ParallaxComponent
          bgImage="/images/bgimg2.jpg"
          bgImageStyle={{ objectFit: "cover" }}
          strength={200}
        ></ParallaxComponent>
      </section>
      <section>
        <Container maxWidth="xl">
          <div className="flex justify-between items-center">
            <h1 className="my-10 text-3xl font-bold">Oxirgi mahsulotlar</h1>
            <Link
              href="/products"
              className="md:block hidden text-sm text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase px-5 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Barcha mahsulotlar
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data.slice(0, 8).map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
};

export default HomePage;
