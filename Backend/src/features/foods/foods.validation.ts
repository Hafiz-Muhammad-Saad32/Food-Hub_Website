import z from "zod";

export const foodSchema = z.object(
    {
        title: z.string().min(3, "Length must be three or more"),
        description: z.string().min(8, "give some valid description"),
        price: z.number().min(10, "price should be greater than 10"),
        quantity: z.number().nonnegative(),
        inStock: z.boolean(),
        catagory: z.array(z.string()),
        image: z.string()
    } 
)

export const foodParam = z.object({
    id: z.string()
})