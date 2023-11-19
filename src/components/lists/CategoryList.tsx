"use client";

import request from "@/server";
import { Category } from "@/types/category";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryCard from "../card/CategoryCard";

const CategoryList = () => {
  const [data, setData] = useState<Category[]>([]);
  const [lading, setLoading] = useState(false);

  

  const getCategories = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request.get("category");
      setData(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
      nextArrow: <button className="slick-next bg-black">Keyingi</button>,
      prevArrow: <button className="slick-prev">Oldingi</button>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div>
        <Slider {...settings}>
        {data.map((category) => (
        <div key={category._id}>
          <CategoryCard {...category} />
        </div>
      ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategoryList;
