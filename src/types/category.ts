import { ProductsImage } from "./products";

export interface Category {
    _id: string;
    name: string;
    image: ProductsImage;
    createdAt: string;
    updatedAt: string;
}