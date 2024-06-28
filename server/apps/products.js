import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {

    const collection = db.collection("pizzaOrders")

    const getPizzaOrdersData = await collection.find({}).toArray()
    
    return res.json({
        data: getPizzaOrdersData
    })
});

productRouter.get("/:id", (req, res) => {});

productRouter.post("/", async (req, res) => {

    const collection = db.collection("pizzaOrders")

    const pizzaOrdersData = { ...req.body }

    await collection
    .insertOne(pizzaOrdersData)

    return res.json({
        message: `Product has been created successfully`
    })
});

productRouter.put("/:productId", async (req, res) => {

    const collection = db.collection("pizzaOrders")
    const orderId = new ObjectId(req.params.productId)
    const newOrderData = { ...req.body };

    await collection.updateOne(
        {
            _id: orderId,
        },{
            $set: newOrderData
        }
    )

    return res.json({
        message: `Product has been updated successfully`
    })
});

productRouter.delete("/:productId", async (req, res) => {

    const collection = db.collection("pizzaOrders")
    const orderId = new ObjectId(req.params.productId)

    await collection.deleteOne({
        _id: orderId
    })

    return res.json({
        message: `Product has been deleted successfully`
    })
    
});

export default productRouter;
