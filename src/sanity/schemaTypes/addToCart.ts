import { defineField, defineType } from "sanity";

export const cart = defineType({
    title: "Cart Item",
    name: "cartItem",
    type: "document",
    fields: [
        defineField({
            name: "productId",
            title: "Product ID",
            type: "number"
        }),
        defineField({
            name: "quantity",
            title: "Quantity",
            type: "number",
            initialValue: 1
        })
    ]
})