import { Router } from "express";
import { methods as Product } from "../controllers/product.controller.js";

const router = Router();

router.get("/",Product.getProducts)
router.get("/:id",Product.getProduct)
router.post("/",Product.createProduct)
router.put("/:id",Product.updateProduct)
router.delete("/:id",Product.deleteProduct)

export default router;