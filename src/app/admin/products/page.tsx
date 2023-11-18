"use client";
import Title from "@/components/shares/Title";
import useProducts from "@/store/products";
import { useEffect, useState } from "react";
import ProductsCardAdmin from "./../../../components/admin/cards/ProductsCard";
import { Box, Button, Grid, Pagination, TextField } from "@mui/material";
import Loading from "@/components/shares/Loading";
import SearchInput from "@/components/admin/search-input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useCategory from "@/store/category";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { useForm, SubmitHandler } from "react-hook-form";
import CardMedia from "@mui/material/CardMedia";
import { ProductsImage } from "@/types/products";
import { LIMIT } from "@/constants";

interface IFormInput {
  title: string;
  price: number;
  quantity: number;
  category: string;
  image: ProductsImage | null;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AdminProduct = () => {
  const [age, setAge] = useState("");
  const [ctgrId, setCtgrId] = useState("");
  const [ctgrIdPr, setCtgrIdPr] = useState("");

  const {
    data: products,
    total: prTotal,
    loading: prLoading,
    page,
    pageSize,
    search,
    isModalOpen,
    photo,
    photoLoading,
    isModalLoading,
    selected,
    handleEdit,
    uploadPhoto,
    handleOk,
    categoryIdFunc,
    showModal,
    closeModal,
    handlePage,
    handleSearch,
    getData: getProducts,
    handleDelete,
    btnId,
    btnLoading,
    categoryName,
    getOneCategory,
    categoryOneId,
  } = useProducts();

  const { categories, getCategory, loading: ctgrLoading } = useCategory();

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleChangeValue = (event: SelectChangeEvent) => {
    setCtgrId(event.target.value as string);
  };

  useEffect(() => {
    getOneCategory();
  }, [getOneCategory]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const { register, handleSubmit, setValue, reset } = useForm<IFormInput>({});

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    data.category = ctgrIdPr;
    data.image = photo;
    handleOk(data, reset);
  };

  return (
    <section>
      <Title>Products({prLoading ? "..." : prTotal})</Title>
      <Box className="flex justify-between items-center">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Category</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="" onClick={() => categoryIdFunc("")}>
              <em>All</em>
            </MenuItem>
            {ctgrLoading
              ? "loading.."
              : categories.map((el) => (
                  <MenuItem
                    key={el._id}
                    value={el.name}
                    onClick={() => categoryIdFunc(el._id)}
                  >
                    {el.name}
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
        <Button
          onClick={showModal}
          size="small"
          variant="contained"
          className="bg-blue-400 text-white py-2 px-7"
        >
          Add
        </Button>
      </Box>
      <Box className="flex flex-wrap gap-2 md:justify-between items-center lg:gap-10">
        <SearchInput handleSearch={handleSearch} search={search} />
      </Box>
      <Grid container spacing={2}>
        {prLoading ? (
          <div className="ml-4">
            <Loading />
          </div>
        ) : (
          products.map((el) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={el._id}
              className="mt-5"
            >
              <ProductsCardAdmin
                {...el}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                setValue={setValue}
                btnLoading={btnLoading}
                btnId={btnId}
              />
            </Grid>
          ))
        )}
      </Grid>
      {prTotal > LIMIT ? (
        <Pagination
          className="mt-10"
          color="primary"
          count={pageSize}
          page={page}
          onChange={(e, value) => handlePage(value)}
        />
      ) : null}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModalOpen}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isModalOpen} className="md:w-auto w-full">
          <Box sx={style}>
            Product data
            <div
              className="absolute top-0 right-3 cursor-pointer"
              onClick={closeModal}
            >
              X
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid xs={12} className="mt-5">
                  <TextField
                    type="file"
                    sx={{ minWidth: "100%" }}
                    onChange={uploadPhoto}
                  />
                  {photoLoading ? (
                    <CardMedia
                      component="img"
                      alt="loading..."
                      className="w-full h-64 mt-5"
                      image={
                        "https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
                      }
                    />
                  ) : (
                    photo && (
                      <CardMedia
                        component="img"
                        alt="loading..."
                        className="w-full h-64 mt-5"
                        image={photo?.url}
                      />
                    )
                  )}
                </Grid>
                <Grid xs={12} className="mt-5">
                  <TextField
                    {...register("title")}
                    size="small"
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid xs={12} className="mt-5">
                  <TextField
                    {...register("price")}
                    size="small"
                    id="outlined-basic"
                    label="Price"
                    variant="outlined"
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid xs={12} className="mt-5">
                  <TextField
                    {...register("quantity")}
                    size="small"
                    id="outlined-basic"
                    label="Quantity"
                    variant="outlined"
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid xs={12} className="mt-5">
                  <FormControl sx={{ minWidth: "100%" }} size="small">
                    <InputLabel id="demo-select-small-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={ctgrId}
                      label="category"
                      onChange={handleChangeValue}
                    >
                      {ctgrLoading
                        ? "loading.."
                        : categories.map((el) => (
                            <MenuItem
                              key={el._id}
                              value={el?.name}
                              onClick={() => setCtgrIdPr(el._id)}
                            >
                              {el.name}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} className="mt-5">
                  {isModalLoading ? (
                    <Button
                      size="small"
                      variant="contained"
                      className="bg-blue-400 text-white w-full cursor-not-allowed"
                    >
                      Loading..
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="small"
                      variant="contained"
                      className="bg-blue-400 text-white w-full"
                    >
                      {selected === null ? "Add" : "save"}
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
    </section>
  );
};

export default AdminProduct;
