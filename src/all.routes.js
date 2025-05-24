import { Router } from "express";
import ProductRoutes from "./modules/products/routes/product.route.js"

const router = Router();

router.get("/test", (req,res)=>{
    return res.status(200).json({message:"todo ok"})
});

router.use("/product",ProductRoutes)

export default router;