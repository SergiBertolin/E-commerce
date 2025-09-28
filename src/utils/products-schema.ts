import { z } from 'zod'

export const CategoriesAPIResponseSchema = z.array(
    z.object({
        slug: z.string()
}))

export const ProductsAPIResponseSchema = z.array(
        z.object({
                id: z.number(),
                title: z.string(),
                description: z.string(),
                category: z.string(),
                price: z.number(),
                images: z.array(
                    z.string()),
        })
)    