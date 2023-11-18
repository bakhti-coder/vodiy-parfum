"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import useAuthCheck from "@/hooks/auth-check";
import useUser from "@/store/user";
import useCategory from "@/store/category";
import useProducts from "@/store/products";
import useOrders from "@/store/orders";
import { CardMedia } from "@mui/material";
import ChartOne from "@/components/admin/chart/chart1";


const DashboardPage = () => {
  useAuthCheck();

  const { total: userTotal, getUserData } = useUser();
  const { categories: category, getCategory } = useCategory();
  const { total: prTotal, getData: getProducts } = useProducts();
  const { data: orderData, getOrders } = useOrders();

  useEffect(() => {
    getUserData();
    getCategory();
    getProducts();
    getOrders();
  }, [getUserData, getCategory, getProducts, getOrders]);

  const renderCard = (title: string, value: number, image: string) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={title}>
      <Card>
        <CardMedia
          component="img"
          className="h-20 mt-3"
          image={image}
          alt="Card Image"
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <section>
      <Grid container spacing={2}>
        {renderCard(
          "Users",
          userTotal,
          "https://cdn-icons-png.flaticon.com/512/33/33308.png"
        )}
        {renderCard(
          "Categories",
          category.length,
          "https://cdn-icons-png.flaticon.com/512/5665/5665189.png"
        )}
        {renderCard(
          "Products",
          prTotal,
          "https://cdn-icons-png.flaticon.com/512/43/43777.png"
        )}
        {renderCard(
          "Orders",
          orderData.length,
          "https://cdn-icons-png.flaticon.com/512/3496/3496155.png"
        )}
      </Grid>

      <div style={{ width: "100%" }}>
        <ChartOne />
      </div>
    </section>
  );
};

export default DashboardPage;
