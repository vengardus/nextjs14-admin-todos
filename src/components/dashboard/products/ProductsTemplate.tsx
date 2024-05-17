import { products } from "@/data/products"
import { ProductList } from "./ProductList"


export const ProductsTemplate = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <ProductList products={products}/>
    </div>
  )
}
