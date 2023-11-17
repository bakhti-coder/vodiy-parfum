"use client";
import Title from "@/components/shares/Title";
import { useEffect } from "react";
import CategoryCardAdmin from "./../../../components/admin/cards/CategoryCard";
import { Box, Button, Grid, Pagination, TextField } from "@mui/material";
import Loading from "@/components/shares/Loading";
import SearchInput from "@/components/admin/search-input";
import useCategory from "@/store/category";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { useForm, SubmitHandler } from "react-hook-form";
import CardMedia from "@mui/material/CardMedia";
import { ProductsImage } from "@/types/products";
import { LIMIT } from "@/constants";

interface IFormInput {
  name: string;
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

const CategoryAdmin = () => {

  const {
    categories: category,
    loading: categoryLoading,
    page,
    search,
    isModalOpen,
    photo,
    photoLoading,
    isModalLoading,
    selected,
    btnId,
    btnLoading,
    handleEdit,
    uploadPhoto,
    handleOk,
    showModal,
    closeModal,
    handlePage,
    handleSearch,
    getCategory,
    handleDelete,
  } = useCategory();

  const pageSize = Math.ceil(category.length / LIMIT);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const { register, handleSubmit, setValue, reset } = useForm<IFormInput>({});

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    data.image = photo;
    handleOk(data, reset);
  };

  return (
    <section>
      <Box className="flex justify-between items-center gap-10">
        <Title>Categories({categoryLoading ? "..." : category.length})</Title>
        <SearchInput handleSearch={handleSearch} search={search} />
      </Box>
      <Box className="text-right">
        
        <Button
          onClick={() => showModal(reset)}
          size="small"
          variant="contained"
          className="bg-blue-400 text-white py-2 px-7"
        >
          Add
        </Button>
      </Box>
      <Grid container spacing={2}>
        {categoryLoading ? (
          <div className="ml-4">
            <Loading />
          </div>
        ) : (
          category.map((el) => (
            <Grid xs={3} key={el._id} className="mt-5">
              <CategoryCardAdmin
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
      {category.length > LIMIT ? (
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
        <Fade in={isModalOpen}>
          <Box sx={style}>
            Category data
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
                    {...register("name")}
                    size="small"
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    sx={{ minWidth: "100%" }}
                  />
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

export default CategoryAdmin;
