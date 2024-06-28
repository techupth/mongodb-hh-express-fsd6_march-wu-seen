import { Router } from "express";
import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";

const productRouter = Router();
const collection = db.collection("products");

productRouter.get("/", async (req, res) => {
  const result = await collection.find().toArray();
  return res.status(200).json({
    message: "success",
    data: result,
  });
});

productRouter.get("/:id", async (req, res) => {
  const productId = req.params.id;
  const objectId = new ObjectId(productId);
  const result = await collection.findOne({
    _id: objectId,
  });
  return res.json({
    data: result,
  });
});

productRouter.post("/", async (req, res) => {
  const result = await collection.insertOne(req.body);
  return res.status(200).json({
    message: "Product has been created successfully",
    data: { id: result.insertedId },
  });
});

productRouter.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const { name, price, image, description, category } = req.body;
  const objectId = new ObjectId(productId);
  const result = await collection.updateOne(
    {
      _id: objectId,
    },
    {
      $set: {
        name: name,
        price: price,
        image: image,
        description: description,
        category: category,
      },
    }
  );
  return res.json({
    message: "Product has been updated successfully",
    data: result,
  });
});

productRouter.delete("/:id", (req, res) => {});

export default productRouter;
