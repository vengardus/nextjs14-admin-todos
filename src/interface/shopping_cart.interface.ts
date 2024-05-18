import type { IProduct } from "@/data/products";

export interface ICart {
    [id: string]: number;
}

export interface IProductInCart {
    product: IProduct;
    quantity: number
}
