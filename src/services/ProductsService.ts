import axios from 'axios'
import { CategoriesAPIResponseSchema, ProductsAPIResponseSchema } from '../utils/products-schema'

export async function getCategories () {

    const categoriesURL = 'https://dummyjson.com/products/categories'

    const url = categoriesURL
    const {data} = await axios(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)
    if(result.success)
        return result.data
}

export async function getProducts () {
    const productsURL = 'https://dummyjson.com/products?limit=0'

    const url = productsURL
    const {data} = await axios(url)
    const result = ProductsAPIResponseSchema.safeParse(data.products)
    if(result.success)
        return result.data
}