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
        const dbProduct = productMap[item.product];

        if(!dbProduct) throw new Error(`Product ${item.product} unavailable`)
            return {
                product: dbProduct.id,
                name: dbProduct.name,
                image: dbProduct.image,
                price: dbProduct.price,
                quantity: item.quantity,
                unit: dbProduct.unit,
        }
    })

    const subtotal = orderItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    const deliveryFee = subtotal > 20 ? 0 : 1.99;
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const total = Math.round((subtotal + deliveryFee + tax) * 100) / 100;

    const order = await prisma.order.create({
        data: {
            userId: req.user!.id,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            subtotal,
            deliveryFee,
            tax,
            total,
            statusHistory: [{status: "Placed", note: "Order Placed Successfully", timestamp: new Date()}]
        }
    })

    if(paymentMethod === "card"){
        // stripe payment link
    }
    res.json({order})

    // stock reduction

    for(const items of orderItems){
        await prisma.product
    }
}