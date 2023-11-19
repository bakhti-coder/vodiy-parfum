'use client'
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import cleanPrice from "@/utils/CleanedPrice";

export default function ProductsCardAdmin({
  sold,
  price,
  description,
  _id,
  title,
  image,
  quantity,
  category,
  handleEdit,
  setValue,
  handleDelete,
  btnId,
  btnLoading,
}: any) {
  const cleanedPrice = cleanPrice(price);

  return (
    <Card sx={{ maxWidth: 345, height: "100%", marginTop: "20px" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        className="h-72 w-full"
        image={image?.url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Box className="flex items-center justify-between">
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cleanedPrice}
            {` so'm`}
          </Typography>
        </Box>
        <Box className="flex items-center justify-between">
          <Typography variant="body2" color="text.secondary">
            Quantity:{quantity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`sold:`}
            {sold}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {`Categroy:`}
          {category?.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          className="bg-blue-600 text-black"
          onClick={() => handleEdit(_id, setValue)}
        >
          edit
        </Button>
        {btnId === _id && btnLoading ? (
          <Button
          size="small"
          variant="contained"
          color="error"
          className="bg-red-600 text-black cursor-not-allowed"
          onClick={() => handleDelete(_id)}
        >
          loading...
        </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            color="error"
            className="bg-red-600 text-black"
            onClick={() => handleDelete(_id)}
          >
            delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
