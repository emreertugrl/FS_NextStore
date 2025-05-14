import express from "express";
import authMiddleware from "../middleware/authMiddleware.ts";
import admin from "../middleware/adminMiddleware.ts";
import CategoryContoller from "./category.controller.ts";

const router = express.Router();

// ✅ GET: /api/products - Tüm ürünleri getir
router.get("/", CategoryContoller.getAllCategory);

// ✅ GET: /api/category/:id - Tek bir ürünü getir
router.get("/:id", CategoryContoller.getCategoryById);

// ✅ POST: /api/category - Yeni ürün oluştur (sadece admin)
router.post("/", authMiddleware, admin, CategoryContoller.createCategory);

// ✅ PUT: /api/category/:id - Ürünü güncelle (sadece admin)
router.put("/:id", authMiddleware, admin, CategoryContoller.updateCategory);

// ✅ DELETE: /api/category/:id - Ürünü sil (sadece admin)
router.delete("/:id", authMiddleware, admin, CategoryContoller.deleteCategory);

export default router;
