"use client"

import request from "@/server";
import { Category } from "@/types/category";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
const CategoryList = () => {
  const [data, setData] = useState<Category[]>([]);
  const [lading, setLoading] = useState(false);

  const getCategories = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request.get("category");
      console.log(data);
      setData(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  console.log(data);
  

  return <div>CategoryList</div>;
};

export default CategoryList;
