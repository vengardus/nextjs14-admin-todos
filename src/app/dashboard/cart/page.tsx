import { CartTemplate } from "@/components/dashboard/cart/CartTemplate"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Cart Page',
    description: 'Productos del Carrito'
}

export default function CartPage() {
    return (
        <CartTemplate />
    )
}
