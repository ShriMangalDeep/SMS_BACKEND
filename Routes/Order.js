"use strict";

import express from "express";
import { getAllNewOrders,getAllUnPaidOrders, getAllPaidOrders, createOrder, updateOrder, deleteOrder, getFilteredResults } from "../Controller/Order.js";
import  validateBody  from "../utilities/bodyValidationMiddlware.js";
import { orderValidationschema } from "../Validation/Order.js";
export const OrderRouter = express.Router();

OrderRouter.get('/all',getFilteredResults);
OrderRouter.get('/paid',getAllPaidOrders);
OrderRouter.get('/unpaid',getAllUnPaidOrders);
OrderRouter.get('/new',getAllNewOrders);
OrderRouter.post('/create',validateBody(orderValidationschema),createOrder);
OrderRouter.put('/update/:id',updateOrder);
OrderRouter.delete('/delete/:id',deleteOrder); 