import ProductCard from "@/components/card/ProductCard";
import ParallaxComponent from "@/components/parralax";
import request from "@/server";
import { Products } from "@/types/products";

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
        <div>
          {data.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
