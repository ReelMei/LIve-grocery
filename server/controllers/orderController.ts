import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

// Order Creation


//POST / api / orders

export const createOrder = async (req: Request, res: Response) => {
    const {items, shippingAddress, paymentMethod} = req.body

    // Checking for order items
    if(!items || items.length === 0){
        return res.status(400).json({message: "No Order Items"})
    }

    // Look Up Original prices from the database
    const productIds = items.map((i: any) => i.product)
    const products = await prisma.product.findMany({where: {id: {in: productIds}}})
    const productMap: Record<string, (typeof products)[0]> = {}


    products.forEach((p: any) => (productMap[p.id] = p))

    // Check Availability of Product
    for(const item of items){
        const product = productMap[item.product]
        if(!product || (product.stock ?? 0) < item.quantity){
            return res.status(404).json({message: "Product Not Available"})
        }
    }

    const orderItems = items.map((item: any) =>{
        const product = productMap
    })
}