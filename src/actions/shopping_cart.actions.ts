//"use client"  Llamado desde client component
import { getCookie, setCookie } from "cookies-next"
import { ICart } from "@/interface/shopping_cart.interface"


const getCookieCart = ():ICart => {
    const cookieCart = getCookie('cart')?? '{}'

    return JSON.parse(cookieCart) 
}


export const actionAddProductCart = (id:string, quantity:number=1) => {
    const cookieCart = getCookieCart() as ICart

    if ( !cookieCart[id] )
        cookieCart[id] = quantity
    else    
        cookieCart[id] = +cookieCart[id] + quantity
    setCookie('cart', JSON.stringify(cookieCart))
}

export const actionRemoveProductCart = (id:string) => {
    const cookieCart = getCookieCart() as ICart

    if ( cookieCart[id] ) {
        delete cookieCart[id]
        setCookie('cart', JSON.stringify(cookieCart))
    }
}