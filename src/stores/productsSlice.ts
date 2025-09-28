import { StateCreator } from "zustand"
import { getCategories, getProducts } from "../services/ProductsService"
import type { Categories, Products, ProductFiltered, CategoryFiltered, PriceFiltered } from "../types"

export type ProductsSliceType = {
    categories: Categories
    products: Products
    filteredProducts: Products
    filtersReset: Products
    fetchCategories: () => Promise<void>
    fetchProducts: () => Promise<void>
    searchProduct: (product : ProductFiltered) => void
    searchCategory: (category : CategoryFiltered) => void
    searchPrice: (price : PriceFiltered) => void
    resetFilters: () => void
}

export const createProductsSlice : StateCreator<ProductsSliceType> = (set) => ({
    categories: [],
    products: [],
    filteredProducts: [],
    filtersReset: [],
    fetchCategories: async () => {
        try {
            const categories = await getCategories()
                set(
                    { categories }
                )
          } catch (error) {
            console.error("Error fetching products:", error)
          }
    },
    fetchProducts: async () => {
        try {
            const products = await getProducts()
                set(
                    {   
                        products,
                        filteredProducts: products
                    }
                )
          } catch (error) {
            console.error("Error fetching products:", error)
          }
    },
    searchProduct: (product) => {
        set((state) => ({
            filteredProducts: state.filteredProducts.filter((item) =>
                item.title.toLowerCase().includes(product.productFiltered.toLowerCase()))
        }))
    },
    searchCategory: (category) => {
        set((state) => ({
            filteredProducts: state.filteredProducts.filter((item) => item.category == category.categoryFiltered)
        }))
    },
    searchPrice: (price) => {
        set((state) => ({
            filteredProducts: state.filteredProducts.filter((item) => item.price >= price.priceFiltered)
        }))
    },
    resetFilters: () => {
        set((state) => ({
            filteredProducts: state.products
        }))
    },
});
