"use client";

import * as React from 'react';
import OrdersTableAdmin from '@/components/admin/table';
import useOrders from '@/store/orders';




const OrdersAdmin = () => {
  const {loading, data} = useOrders()

  const getStatusLength = (status: string) => data.filter(order => order.status === status).length;

  const acceptedLength = getStatusLength('ACCEPTED');
  const successLength = getStatusLength('SUCCESS');
  const canceledLength = getStatusLength('CANCELED');

  return (
    <section>
      <OrdersTableAdmin status='ACCEPTED' length={acceptedLength} />
      <OrdersTableAdmin status='SUCCESS' length={successLength}/>
      <OrdersTableAdmin status='CANCELED' length={canceledLength}/>
    </section>
  );
};

export default OrdersAdmin;
