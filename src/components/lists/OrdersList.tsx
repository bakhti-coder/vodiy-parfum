"use client";

import request from "@/server";
import { Products } from "@/types/products";
import { Fragment, useCallback, useEffect, useState } from "react";
import TablePayment from "../card/TablePayment";
import Loading from "../shares/Loading";
import Title from "../shares/Title";

const OrdersList = () => {
  const [data, setData] = useState<Products[]>([]);
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

  const Status = [
    {
      status: 'ACCEPTED',
      name: 'Yuborilgan buyurtmalar'
    }, {
      status: 'SUCCESS',
      name: 'Qabul qilingan buyurtmalar'
    }, {
      status: 'CANCELED',
      name: 'Bekor qilingan buyurtmalar'
    }
  ]

  return <div>
    <h1 className="text-3xl font-extrabold">
        Buyurtmalaringiz
      </h1>
      {Status.map((el) => (
        <Fragment>
          <h1 className={`mt-10 text-center ${el.status === 'ACCEPTED' && 'text-black' || el.status === 'SUCCESS' && 'text-green-900' || el.status === 'CANCELED' && 'text-red-800'}`}>{el.name}</h1>
            {lading ?  <Loading /> : data.filter((pr: any) => pr.status === el.status).map(el => (
              <TablePayment key={el._id} {...el} />
            ))}
        </Fragment>
    ))}
  </div>;
};

export default OrdersList;
