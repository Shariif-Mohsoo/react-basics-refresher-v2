import express from 'express';

import {getProducts, getProductById, createdProduct, updateProduct, deleteProduct, createProductReview, getTopProducts } from '../controllers/productController.js';
import {protect,admin} from "../middleware/authMiddleware.js"; 

const router = express.Router();

// router.get("/",getProducts)
// router.get("/:id",getProductById)

//OR
router.route('/').get(getProducts).post(protect,admin,createdProduct);
router.route("/top").get(getTopProducts);
router.route("/:id").get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct);
router.route("/:id/reviews").post(protect,createProductReview)

export default router; 