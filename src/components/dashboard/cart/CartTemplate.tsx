import { products } from "@/data/products"
import { ItemCart } from "./ItemCart"
import { ICart, IProductInCart } from "@/interface/shopping_cart.interface"
import { getCookiesCart } from "@/helpers/cookies/cookies_server"
import { WidgetItem } from "../widgets/WidgetItem"


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
  const totalPay = productsInCart.reduce((acumulador, current) =>
    (current.product.price * current.quantity) + acumulador, 0)

  return (
    <>
      <h1 className="text-3xl mb-2">Productos en el  carrito</h1>
      <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-500" />

      <div className="flex flex-col sm:flex-row w-full gap-2">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {
            productsInCart.length < 1
              ? <h2>No hay productos en el carrito</h2>
              : productsInCart.map(item => (
                <ItemCart key={item.product.id}
                  product={item.product}
                  quantity={item.quantity}
                />
              ))
          }
        </div>

        <div className="sm:w-4/12 w-full">
          <WidgetItem title="Tota a pagar">
            <div className="flex flex-col items-center gap-2 mt-2">
              <span className="text-5xl">
                $ {(totalPay * 1.15).toFixed(2)}
              </span>
              <span className="font-bold text-gray-700">
                Impuestos 15%: $ {(totalPay * 0.15).toFixed(2)}
              </span>
            </div>
          </WidgetItem>
        </div>

      </div>
    </>
  )
}
