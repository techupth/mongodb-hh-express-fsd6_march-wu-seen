import { Router } from "express";
import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";

const productRouter = Router();
const collection = db.collection("products");

productRouter.get("/", async (req, res) => {
   const result = await collection.find().toArray()
   return res.status(200).json({
      message: "success",
      data: result
   })
});

productRouter.get("/:id", (req, res) => {});

productRouter.post("/", async (req, res) => {
  const result = await collection.insertOne(req.body);
  return res.status(200).json({
    message: "Product has been created successfully",
    data: { id: result.insertedId },
  });
});

productRouter.put("/:id", (req, res) => {});

productRouter.delete("/:id", (req, res) => {});

export default productRouter;
