import PageTransitionProvider from "@/components/animation/page-transition";
import SingleCard from "@/components/card/SingleCard";
import SimilarProductsList from "@/components/lists/SimilarProductsList";
import request from "@/server";
import DynamicMetaData from "@/types/dynamic-metaData";
import { Products } from "@/types/products";

export  async function generateMetadata({ params: { id } }: DynamicMetaData) {
  const { data } = await request.get<Products>(`product/${id}`);

  return {
    title: `Vodiy parfum | ${data.title}`,
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
    <PageTransitionProvider>
    <section>
      <div className="container max-w-1200 py-20">
        <SingleCard {...data} />
        <h2 className="text-2xl font-bold text-dark leading-8 mt-32 mb-5">
          O'xshash mahsulotlar
        </h2>
        <SimilarProductsList id={data?.category} />
      </div>
    </section>
    </PageTransitionProvider>
  );
};

export default SingleProduct;
