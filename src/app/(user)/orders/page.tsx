"use client"

import OrdersList from "@/components/lists/OrdersList";
import useAuthCheck from "@/hooks/auth-check";


const OrdersPage = () => {
  useAuthCheck()
  return (
    <section className='container max-w-1200 pt-32'>
      <OrdersList />
    </section>
  )
}

export default OrdersPage