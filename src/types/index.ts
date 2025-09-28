import {z} from 'zod'
import { CategoriesAPIResponseSchema, ProductsAPIResponseSchema } from '../utils/products-schema'

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type Products = z.infer<typeof ProductsAPIResponseSchema>

export type Product = {
    id: number
    title: string
    description: string
    category: string
    price: number
    images: string[]
  }

export type ProductFiltered = {
    productFiltered: string
}

export type CategoryFiltered = {
    categoryFiltered: string
}

export type PriceFiltered = {
    priceFiltered: number
}

export type CartItem = {
  id: number
  title: string
  description: string
  category: string
  price: number
  images: string[]
  quantity: number
}