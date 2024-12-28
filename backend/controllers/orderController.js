import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing frontend user order
const placeOrder = async (req,res) =>{
    const frontendUrl = process.env.FRONTEND_URL;

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});
        
        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"cad",
                product_data:{
                    name:item.name
                },
                unit_amount:Math.round(item.price*100*1.37)
            },
            quantity:item.quantity
        }));
        line_items.push({
            price_data:{
                currency:"cad",
                product_data:{
                    name:"Delivery Fee"
                },
                unit_amount:Math.round(2*100*1.37)
            },
            quantity:1
        });

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({success:true, session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

const verifyOrder = async (req,res) =>{
    const {orderId, success} = req.body;
    try {
        if (success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true, message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// Frontend user orders
const userOrders = async (req,res) =>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// For admin list of all user orders
const listOrders = async (req,res) =>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// Update order status API
const updateStatus = async (req,res) =>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true, message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Status not Updated"})
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}