"use strict";

import mongoose from "mongoose";

const METAL_ENUM = ['gold','silver','platinum','imitation'];
const METAL_PURITY_ENUM = ['18KT','22KT','24KT','100%'];
const ORDER_STATUS = ['paid','unpaid','new']
function greaterThanZero(val) {
    return val >0;
  }


const orderSchema=new mongoose.Schema({
    customername:{
        type:String,
        minlength:[5,"Customer Name should be minimum 5 character long !"],
        maxlength:[100,"Customer Name should be maximum 100 character long !"],
        required:[true,"Product Name is required !"],
    },
    phonenumber:{
        type:String,
        required:[true,"Customer phone number is required !"],
    },
    productname:{
        type:String,
        minlength:[5,"Product should be minimum 5 character long !"],
        maxlength:[100,"Product Name should be maximum 100 character long !"],
        required:[true,"Product Name is required !"],
    },
    metal:{
        type:String,
        enum:{
            values:METAL_ENUM,
            message:"Product Metal should be one of 'Gold', 'Silver', 'Platinum' or 'Immitation' !"
        },
        required:[true,"Product Metal type is required !"]
    },
    metalpurity:{
        type:String,
        // enum:[METAL_PURITY_ENUM,"Product Metal Purity should be one of '18KT', '22KT', '24KT', '100%'."],
        enum:{
            values:METAL_PURITY_ENUM,
            message:"Product Metal Purity should be one of '18KT', '22KT', '24KT', '100%' !"
        },
        required:[true,"Product Metal Purity is required.!"]
    },
    productweight:{
        type:Number,
            validate:[
                {
                    validator:greaterThanZero,
                    message:"Product Gross Weight should be more than 0 !"
                }
            ],
        // validate:[greaterThanZero,async function greaterThanMetalweight() {
        //     return await this.metalweight>this.grossweight?false:true;
        // },"Product Gross Weight should be greater than 0 and greater than or equal to Product Metal Weight."],
        required:[true,"Product Gross Weight is required !"],
    },
    orderstatus:{
        type:String,
        enum:{
            values:ORDER_STATUS,
            message:"Order Status should be one of 'Paid', 'Unpaid', or 'New' !"
        },
        required:[true,"Order Status is required !"]
    },
    message:{
        type:String,
        minlength:[5,"Message should be minimum 5 character long !"],
        maxlength:[300,"Customer Name should be maximum 100 character long !"],
    },
    purchasedate:{
        type:Date,
        default:Date
    },
    purchaseprice:{
        type:Number,
        required:[true,"Product Purchasing Price is required !"],
        min:[0,"Product Purchasing Price cannot be less 0 !"]
    },
    transaction:{
        type:[{
            transactiondate:Date,
            amount:Number,
        }],
        default:[]
    },
    rate:{
        type:Number,
        min:[0,"Current Gold Rate cannot be less than 0 !"],
        required:[0,"Current Gold Rate is required !"]
    },
    labour:{
        type:Number,
        min:[0,"Labour cannot be less than 0 !"],
        required:[0,"Current Gold Rate is required !"]
    },
    extra:{
        type:Number,
        default:0
    },

});

// for try to search keywords in order, by phonenumber
orderSchema.index({phonenumber:'text'});

const Order=mongoose.model('Orders',orderSchema);

export default Order;