import { products } from "@/data/products"
import { ItemCart } from "./ItemCart"
import { ICart, IProductInCart } from "@/interface/shopping_cart.interface"
import { getCookiesCart } from "@/helpers/cookies/cookies_server"


const getProductsInCart = (cart: ICart): IProductInCart[] => {
  const productsInCart = Object.keys(cart).map(id => (
    {
      product: products.find(product => product.id == id),
      quantity: cart[id]
    } as IProductInCart
  )).filter(product => product.product != undefined)

  return productsInCart
}


export const CartTemplate = () => {
  const productsInCart = getProductsInCart(getCookiesCart())

  return (
    <>
      <h1 className="text-3xl mb-2">Productos en el  carrito</h1>
      <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-500" />

      <div className="flex flex-col sm:flex-row sm:flex-wrap w-full gap-2">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {
            productsInCart.map(item => (
              <ItemCart key={item.product.id}
                product={item.product}
                quantity={item.quantity}
              />
            ))
          }
        </div>
      </div>
    </>
  )
}
