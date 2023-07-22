"use strict";

import mongoose from "mongoose";
import Order from '../Model/Order.js';

const OrderType = ['new','paid','unpaid'];
const SearchField = ['customername','phonenumber'];

// get filter Results
export const getFilteredResults = async(req,res)=>{
    try{
        let fobj={};
        let filter = req.query;
        if(filter.billType && OrderType.includes(filter.billType))
        {
            fobj.orderstatus=filter.billType;
        }
        if(filter.searchField && SearchField.includes(filter.searchField))
        {
            console.log('1');
            if(filter.searchValue && filter.searchValue!='')
            {
                console.log('2');
                fobj[filter.searchField]=filter.searchValue;
            }
        }
        const results= await Order.find(fobj).sort({_id:-1});
        res.status(200).json({success:1,message:"Orders Retrieved Successfully.",data:results});
        
    }
    catch(err)
    {
        return res.status(500).json({success:0,message:err.message,data:null});
    }
}


// get all paid order
export const getAllPaidOrders= async(req,res)=>{
    try{
        const results= await Order.find({orderstatus:'paid'}).sort({_id:-1});
        res.status(200).json({success:1,message:"Paid Orders Retrieved Successfully.",data:results});
    }
    catch(err)
    {
        return res.status(500).json({success:0,message:err.message,data:null});
    }
}
// get all unpaid order
export const getAllUnPaidOrders= async(req,res)=>{
    try{
        const results= await Order.find({orderstatus:'unpaid'}).sort({_id:-1});
        res.status(200).json({success:1,message:"UnPaid Orders Retrieved Successfully.",data:results});
    }
    catch(err)
    {
        return res.status(500).json({success:0,message:err.message,data:null});
    }
}
// get all paid order
export const getAllNewOrders= async(req,res)=>{
    try{
        const results= await Order.find({orderstatus:'new'}).sort({_id:-1});
        res.status(200).json({success:1,message:"New Orders Retrieved Successfully.",data:results});
    }
    catch(err)
    {
        return res.status(500).json({success:0,message:err.message,data:null});
    }
}
//create new Order
export const createOrder = async (req, res) => {
    try {
        const temp = new Order(req.body);
        const newOrder = await temp.save();
        res.status(200).json({ success: 1, message: "Order created successfully.", data: newOrder });
    }
    catch (err) {
        if (err.name === 'MongoServerError' && err.code === 11000) {
            return res.status(406).json({ success: 0, message: "Order with the given name already exist.", data: null });
        }
        else {
            return res.status(500).json({ success: 0, message: err.message, data: null });
        }
    }
}


//update order by ID
export const updateOrder = async (req, res) => {
    try {
        let temporder
        if (mongoose.isValidObjectId(req.params.id)) // checking if the user passed ID is valid
        {
            temporder = await Order.findById(req.params.id); // checking if Order with this id exist 
            if (temporder == null) {
                return res.status(404).json({ success: 0, message: "No Order with this ID available." });
            }
            else {
                temporder.customername=req.body.customername;
                temporder.productname=req.body.productname;
                temporder.phonenumber=req.body.phonenumber;
                temporder.metal=req.body.metal;
                temporder.metalpurity=req.body.metalpurity;
                temporder.productweight=req.body.productweight;
                temporder.orderstatus=req.body.orderstatus;
                temporder.message=req.body.message;
                temporder.purchasedate=req.body.purchasedate;
                temporder.purchaseprice=req.body.purchaseprice;
                temporder.labour=req.body.labour;
                temporder.rate=req.body.rate;
                temporder.extra=req.body.extra;
                temporder.transaction=req.body.transaction;

                const result = await temporder.save();
                res.status(200).json({ success: 1, message: "Order Updated successfully.", data: result })
            }
        }
        else {
            return res.status(400).json({ succes: 0, message: "Invalid Order-ID.", data: null });
        }
    }
    catch (err) {
        if (err.name === 'MongoServerError' && err.code === 11000) {
            return res.status(406).json({ success: 0, message: "Order with the given name already exist." });
        }
        else {
            return res.status(500).json({ success: 0, message: err.message, data: null });
        }
    }
}



//delete Order by ID
export const deleteOrder = async (req, res) => {
    let temporder
    try {
        if (mongoose.isValidObjectId(req.params.id)) // checking if the user passed ID is valid
        {
            temporder = await Order.findById(req.params.id); // checking if Order with this id exist 
            if (temporder == null) {
                return res.status(404).json({ success: 0, message: "No Order with this ID available." });
            }
            else {
                await temporder.remove();
                res.status(200).json({ success: 1, message: "Order deleted successfully.", data: null })
            }
        }
        else {
            return res.status(400).json({ succes: 0, message: "Invalid Order-ID.", data: null });
        }
    }
    catch (err) {
        return res.status(500).json({ succes: 0, message: err.message, data: null });
    }
}