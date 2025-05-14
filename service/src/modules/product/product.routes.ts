import express from "express";
import ProductContoller from "./product.controller.ts";
import admin from "../middleware/adminMiddleware.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router = express.Router();

// ✅ GET: /api/products - Tüm ürünleri getir
router.get("/", ProductContoller.getAllProducts);

// ✅ GET: /api/products/:id - Tek bir ürünü getir
router.get("/:id", ProductContoller.getProductById);

// ✅ POST: /api/products - Yeni ürün oluştur (sadece admin)
router.post("/", authMiddleware, admin, ProductContoller.createProduct);

// ✅ PUT: /api/products/:id - Ürünü güncelle (sadece admin)
router.put("/:id", authMiddleware, admin, ProductContoller.updateProduct);

// ✅ DELETE: /api/products/:id - Ürünü sil (sadece admin)
router.delete("/:id", authMiddleware, admin, ProductContoller.deleteProduct);

export default router;
