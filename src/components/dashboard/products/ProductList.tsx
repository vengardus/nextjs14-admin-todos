import type { IProduct } from "@/data/products"
import { ProductCard } from "./ProductCard"


interface Props {
    products: IProduct[]
}

export const ProductList = ({ products }: Props) => {
    return (
        <>
            {
                products?.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
        </>
    )
}
