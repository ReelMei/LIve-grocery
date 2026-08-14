import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { timeStamp } from "node:console";

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
        await prisma.product.update({
            where: {id: items.product},
            data: {stock: {decrement: items.quantity}}
        })
    }
}



// Get User's Orders
//GET / api / orders

export const getUserOrders = async (req: Request, res: Response) => {
    const { status } = req.query

    const where: any = {
        userId: req.user!.id,
        NOT: [{paymentMethod: "card", isPaid: false}]
    }

    if(status && status !== "all"){
        where.status = status;
    }

    const orders = await prisma.order.findMany({
        where,
        include: {deliveryPartner: {select: {name: true, phone: true}}},
        orderBy: { createdAt: "desc"},
    })
    res.json({orders})
}


// GET single order
// GET / api / orders/:id

export const getOrder = async (req: Request, res: Response) => {
    const order = await prisma.order.findFirst({
        where: {id: req.params.id as string, userId: req.user!.id},
        include: {deliveryPartner: {select: {name: true, phone: true, avatar: true, vehicleType: true}}}
    })

    if(!order){
        return res.status(404).json({message: "Order not FOund"})
    }
    res.json({order})
}


// Update {Admin} order status
// PUT / api / orders/:id/status

export const updateOrderStatus = async (req: Request, res: Response) => {
    const {status, note} = req.body;
    const order = await prisma.order.findUnique({
        where: {id: req.params.id as string}
    })

    if(!order){
        return res.status(404).json({message: "Order not found"})
    }

    const history = (Array.isArray(order.statusHistory) ? order.statusHistory : []) as any [];
    history.push({status, note: note || `Order ${status.toLowerCase()}`, timeStamp: new Date()})

    const updateOrder = await prisma.order.update({
        where: {id: req.params.id as string},
        data: {status, statusHistory: history}
    })

    res.json({order: updateOrder})
}



// Get All {Admin} order s
// PUT / api / orders/all

export const getAllOrders = async (req: Request, res: Response) => {
    const { status } = req.query


    const orders = await prisma.order.findMany({
        where: {NOT: [{paymentMethod: "card", isPaid: false}]},
        include: {
            user: {select: {name: true, email: true}},
            deliveryPartner: {select: {name: true, phone: true, email: true}}},
            orderBy: { createdAt: "desc"},
    })
    res.json({orders})
}


// Get order location
// PUT / api / orders/:id/location

export const getOrderLocation = async (req: Request, res: Response) => {
    const order = await prisma.order.findFirst({
        where: {id: req.params.id as string, userId: req.user!.id},
        select: {liveLocation: true, status: true}
    })

    if(!order) return res.status(404).json({message: "Order not found"})
    res.json({liveLocation: order.liveLocation, status: order.status})
}
