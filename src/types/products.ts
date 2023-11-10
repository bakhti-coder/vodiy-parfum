export interface Products {
  checked: boolean;
  sold: number;
  price: number;
  description: string;
  _id: string;
  title: string;
  image: {
    public_id: string;
    url: string;
  };
  quantity: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface ProductsImage {
  public_id: string;
  url: string;
}
