"use client";

import request from "@/server";
import { Products } from "@/types/products";
import { Fragment, useEffect, useState } from "react";
import Loading from "../shares/Loading";
import ProductCard from "../card/ProductCard";

interface ProductData {
  total: number;
  products: Products;
}

const SimilarProductsList = ({ id }: { id: any }) => {
  const [data, setData] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategoryProducts();
  }, [id]);

  async function getCategoryProducts() {
    try {
      setLoading(true);
      const { data } = await request.get("product", {
        params: { category: id },
      });
      setData(data.products);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {loading ? (
          <Loading />
        ) : (
          data.slice(0, 10).map((el) => <ProductCard key={el._id} {...el} />)
        )}
      </div>
    </Fragment>
  );
};

export default SimilarProductsList;
