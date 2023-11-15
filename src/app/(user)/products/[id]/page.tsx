import SingleCard from "@/components/card/SingleCard";
import request from "@/server";
import DynamicMetaData from "@/types/dynamic-metaData";
import { Products } from "@/types/products";

async function generateMetadata({ params: { id } }: DynamicMetaData) {
  const { data } = await request.get<Products>(`product/${id}`);

  return {
    title: data.title,
    description: data.description,
  };
}

const SingleProduct = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await request.get<Products>(`product/${id}`);

  return (
    <section>
      <div className="container max-w-1200 py-20">

          <SingleCard data={data} />

        <h2 className="text-2xl font-bold text-dark leading-8 mt-32 mb-5">
          Boshqa mahsulotlar
        </h2>
      </div>
    </section>
  );
};

export default SingleProduct;
