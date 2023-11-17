interface Cart {
    _id: string;
    product: string;
    quantity: number;
    length?: number;
}

export interface OrdersType {
    status: string;
    _id: string;
    userId: string;
    cart: Cart;
    comment?: string;
    createdAt: string;
}
