import PageTransitionProvider from "@/components/animation/page-transition";
import FavouriteList from "@/components/lists/FavouriteList";
import { Container } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vodiy Parfum | Favourite",
  description: "Vodiy Parfum | Home - e-commerce website",
};

const FavouritePage = () => {
  return (
    <PageTransitionProvider>
      <section>
        <Container maxWidth="xl" sx={{ marginTop: "100px" }}>
          <FavouriteList />
        </Container>
      </section>
    </PageTransitionProvider>
  );
};

export default FavouritePage;
