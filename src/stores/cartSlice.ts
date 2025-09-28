import { StateCreator } from "zustand"
import type { CartItem, Product } from "../types"

export type CartItemsSliceType = {
    cartItems: CartItem[]
    open: boolean
    addToCart: (product: Product) => void
    removeFromCart: (id: number) => void
    increaseQuantity: (id: number) => void
    decreaseQuantity: (id: number) => void
    setOpen: (value: boolean) => void
}

const createNewProduct = (newProduct: Product) : CartItem => {
    return { ...newProduct, quantity: 1 }
}

export const createCartSlice : StateCreator<CartItemsSliceType> = (set) => ({
    cartItems: [],
    open: false,
    addToCart: (product) => {
        set((state) => {
            const existingItem = state.cartItems.find(item => item.id === product.id)

            if (existingItem) {
                return {
                    cartItems: state.cartItems.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                }
            } else {
                return {
                    cartItems: [...state.cartItems, createNewProduct(product)]
                }
            }
        })
    },
    increaseQuantity: (id) => {
        set((state) => ({
            cartItems: state.cartItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        }))
    },
    decreaseQuantity: (id) => {
        set((state) => ({
            cartItems: state.cartItems
                .map(item => 
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter(item => item.quantity > 0)
        }))
    },
    removeFromCart: (id) => {
        set((state) => ({
            cartItems: state.cartItems.filter(item => item.id !== id)
        }))
    },
    setOpen: (value) => {
        set({
            open: value
        })
    }
});
