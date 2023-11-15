"use client"

import OrdersList from "@/components/lists/OrdersList";
import withAuth from "@/app/hoc/with-auth";


const OrdersPage = () => {
  return (
    <section className='container max-w-1200 pt-32'>
      <OrdersList />
    </section>
  )
}

export default withAuth(OrdersPage)