"use client"

import PageTransitionProvider from "@/components/animation/page-transition";
import OrdersList from "@/components/lists/OrdersList";
import useAuthCheck from "@/hooks/auth-check";


const OrdersPage = () => {
  useAuthCheck()
  return (
    <PageTransitionProvider>
    <section className='container max-w-1200 pt-32'>
      <OrdersList />
    </section>
    </PageTransitionProvider>
  )
}

export default OrdersPage