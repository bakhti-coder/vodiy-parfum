
import ProductsList from "@/components/lists/ProductsList";
import { Container } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vodiy Parfum | All Products",
  description: "Vodiy Parfum | All Porducts shapmun, sovun",
};

const AllProductsPage = async () => {

  return (
    <section className="py-20">
      <Container maxWidth="xl">
       
        <ProductsList />
      </Container>
    </section>
  );
};

export default AllProductsPage;
