import OrdersList from "@/components/lists/OrdersList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vodiy Parfum | Orders ",
  description: "Vodiy Parfum | Home - e-commerce website orders page",
};

const OrdersPage = () => {
  return (
    <section className='container max-w-1200 pt-32'>
      <OrdersList />
    </section>
  )
}

export default OrdersPage