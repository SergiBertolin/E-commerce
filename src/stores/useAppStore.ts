import { create } from 'zustand'
import { createProductsSlice, type ProductsSliceType } from './productsSlice'
import { devtools } from 'zustand/middleware'
import { createCartSlice, type CartItemsSliceType } from './cartSlice'
import { createFavoritesSlice, type FavoritesSliceType } from './favoritesSlice'

export const useAppStore = create<ProductsSliceType & CartItemsSliceType & FavoritesSliceType>()(devtools( (...a) => ({
    ...createProductsSlice(...a),
    ...createCartSlice(...a),
    ...createFavoritesSlice(...a),
})))