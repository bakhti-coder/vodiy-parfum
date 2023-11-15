"use client";

import request from "@/server";
import { Payments } from "@/types/payments";
import { Products } from "@/types/products";
import { useCallback, useEffect, useState } from "react";
import TablePayment from "../card/TablePayment";
import Loading from "../shares/Loading";

const OrdersList = () => {
  const [data, setData] = useState<Products[]>([]);
  console.log(data)
  const [lading, setLoading] = useState(false);

  const getPayments = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request.get("auth/payments");
      setData(data)
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPayments();
  }, [getPayments]);


  return <div>
    <h1 className="text-3xl font-extrabold">
        Buyurtmalaringiz
      </h1>
      {lading ?  <Loading /> : data.map(el => (
      <TablePayment key={el._id} {...el} />
    ))}
    
  </div>;
};

export default OrdersList;
