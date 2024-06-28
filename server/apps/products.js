import { Router } from "express";
import { db } from "../utils/db.js";

const productRouter = Router();

const collection = db.collection("movies");

productRouter.get("/", async (req, res) => {
  try {
    const result = await collection.find().toArray();
    return res.status(200).json({ data: result });
  } catch {
    return res
      .status(500)
      .json({ message: "Cannot get data due to server connection" });
  }
});

productRouter.get("/:product", async (req, res) => {
  const product = req.params.product;
  try {
    const result = await collection.find({ name: product }).toArray();
    return res.status(200).json({ data: result });
  } catch {
    return res
      .status(500)
      .json({ message: "Cannot get data due to server connection" });
  }
});

productRouter.post("/", async (req, res) => {
  const moviesData = { ...req.body };
  try {
    const result = await collection.insertOne(moviesData);
    return res
      .status(200)
      .json({ data: "Product has been created successfully" });
  } catch {
    return res
      .status(500)
      .json({ message: "Cannot create data due to server connection" });
  }
});

productRouter.put("/:product", async (req, res) => {
  const product = { ...req.body };
  try {
    const result = await collection.updateMany(
      { name: product },
      {
        $set: {
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          category: product.category,
        },
      }
    );
    return res
      .status(200)
      .json({ data: "Product has been updated successfully" });
  } catch {
    return res
      .status(500)
      .json({ message: "Cannot update data due to server connection" });
  }
});

productRouter.delete("/:product", async(req, res) => {
  const product = req.params.product;
  try {
    const result = await collection.deleteOne({ name: product });
    return res.status(200).json({ message: "Product has been deleted successfully" });
  } catch {
    return res
      .status(500)
      .json({ message: "Cannot delete data due to server connection" });
  }
});


export default productRouter;
