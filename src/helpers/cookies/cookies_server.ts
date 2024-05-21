//use server
import { cookies } from "next/headers"
import type{ ICart } from "@/interface/shopping_cart.interface"


export const getCookiesCart = (): ICart => {
    const cookieStore = cookies()
    const cookieCart: ICart = JSON.parse(cookieStore.get('cart')?.value as string ?? '{}')
    //const cart = JSON.parse( cookieStore.get('cart')?.value ?? '{}' );

    return cookieCart
  }
  