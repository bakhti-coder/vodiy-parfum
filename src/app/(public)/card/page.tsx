import PaymenCart from "@/components/lists/PaymenCart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vodiy Parfum | Cart",
  description: "Vodiy Parfum | Home - e-commerce website cart page",
};

const CardPage = () => {

  return (
    <section>
      <div className="container max-w-1200 pt-40">
        <PaymenCart />
      </div>
    </section>
  );
};

export default CardPage;
