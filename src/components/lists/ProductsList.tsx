"use client";

import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import ProductCard from "@/components/card/ProductCard";
import Loading from "../shares/Loading";
import Title from "../shares/Title";
import request from "@/server";
import { useEffect, useState, useCallback } from "react";
import { Products } from "@/types/products";
import { Category } from "@/types/category";

import './style.scss'

const ProductsList = () => {
  const [data, setData] = useState<Products[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<Category[]>([]);
  const [loadingCtgr, setLoadingCtgr] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [categoryId, setCategoryId] = useState<string>();
  const [activeCategory, setActiveCategory] = useState<string | null>(null); 
  const [activeSort, setActiveSort] = useState<string | null>(null); 

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request.get("product", {
        params: {
          limit: 10,
          search,
          sort,
          category: categoryId ? categoryId : undefined,
        },
      });
      setData(data?.products);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  }, [search, sort, categoryId]);

  const getCategories = useCallback(async () => {
    try {
      setLoadingCtgr(true);
      const { data } = await request.get("category");
      setCategory(data);
    } finally {
      setLoadingCtgr(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    getProducts();
  };

  const handleCategoryClick = (id: string) => {
    setCategoryId(id);
    setActiveCategory(id);
    getProducts();
  };

  const handleSortClick = (params: string) => {
    setSort(params);
    setActiveSort(params);
    getProducts();
  };

  const sortParams = [
    {
      name: `Eng so'nggi mahsulotlar`,
      params: `""`,
    },
    {
      name: `Eng eski mahsulotlar`,
      params: `oldest`,
    },
    {
      name: `Eng ko'p sotilganlar`,
      params: `sold`,
    },
    {
      name: `Eng kam sotilgan`,
      params: `-sold`,
    },
    {
      name: `En qimmat mahsulotlar`,
      params: `price`,
    },
    {
      name: `En arzon mahsulotlar`,
      params: `-price`,
    },
    {
      name: `Sarlavha bo'yicha o'shirish`,
      params: `title`,
    },
    {
      name: `Sarlavha bo'yicha kamayish`,
      params: `-title`,
    },
  ];

  return (
    <div>
      <Title>Barcha mahsulotlar</Title>
      <hr className="my-5 h-[1px] bg-gray-500" />
      <Grid container spacing={isSmallScreen ? 0 : 2}>
        <Grid item xs={12} md={2}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{`Categoriya bo'yicha (${category.length})`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {loadingCtgr ? (
                <Loading />
              ) : (
                category.map((el) => (
                  <Typography
                    key={el._id}
                    onClick={() => handleCategoryClick(el._id)}
                    className={`cursor-pointer mt-1 ${
                      activeCategory === el._id ? "active" : ""
                    }`} 
                  >
                    {el.name}
                  </Typography>
                ))
              )}
              <hr className="my-5 h-[1px] bg-gray-500" />
            </AccordionDetails>
          </Accordion>
          <div className="ml-4">
            {sortParams.map((el) => (
              <p
                key={el.name}
                className={`mt-3 cursor-pointer ${
                  activeSort === el.params ? "active" : ""
                }`} 
                onClick={() => handleSortClick(el.params)}
              >
                {el.name}
              </p>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={10}>
          <div className="relative w-full my-2">
            <input
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              value={search}
              className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <SearchIcon />
            </span>
          </div>
          <div
            className={`grid grid-cols-1 ${
              isSmallScreen
                ? "sm:grid-cols-2"
                : "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
            } gap-2`}
          >
            {loading ? (
              <Loading />
            ) : (
              data.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductsList;
