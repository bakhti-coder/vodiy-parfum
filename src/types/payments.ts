import { Products } from "./products";

export interface Payments {
    status: string;
    _id: string;
    userId: string;
    cart: Products[];
    comment: string;
    createdAt: string;
    updatedAt: string;
}