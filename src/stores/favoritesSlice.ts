import type { StateCreator } from "zustand";
import type { Product } from "../types";

export type FavoritesSliceType = {
    favorites: Product[]
    handleClickFavorite: (product: Product) => void
    favoriteExist: (id: Product['id']) => boolean
    loadFromStorage: () => void
}

export const createFavoritesSlice : StateCreator<FavoritesSliceType> = (set, get) => ({
    favorites: [],
    handleClickFavorite: (product) => {
        const isAlreadyFavorite = get().favoriteExist(product.id)
        const newFavorites = isAlreadyFavorite
            ? get().favorites.filter(f => f.id !== product.id)
            : [...get().favorites, product]
    
        set({ favorites: newFavorites })
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
    },
    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.id === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})