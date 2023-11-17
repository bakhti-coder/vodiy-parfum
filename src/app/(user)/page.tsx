import ProductCard from "@/components/card/ProductCard";
import CategoryList from "@/components/lists/CategoryList";
import ParallaxComponent from "@/components/parralax";
import Title from "@/components/shares/Title";
import request from "@/server";
import { Products } from "@/types/products";
import { Container } from "@mui/material";
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
        <div className="parallax"></div>
      </section>
      <section>
        <Container maxWidth="xl">
          <div className="flex justify-between items-center">
            <Title>Oxirgi mahsulotlar</Title>
            <Link
              href="/products"
              className="md:block hidden text-sm text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase px-5 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Barcha mahsulotlar
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data
              .filter((el) => el?.quantity !== 0)
              .slice(0, 10)
              .map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
          </div>
        </Container>
      </section>
      <section className='category_section'>
        <Container maxWidth="xl">
        <Title>Categoriyalar</Title>
          <CategoryList />
        </Container>
      </section>
    </main>
  );
};

export default HomePage;