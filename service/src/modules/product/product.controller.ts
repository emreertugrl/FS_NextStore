import { Request, Response, NextFunction } from "express";
import ProductService from "./product.service.ts";
import { createProductSchema, validateProductDto } from "./product.dto.ts";

// Kullanıcı kaydı
class ProductContoller {
  static async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filters = req.query; // örn: ?category=phone&isFeatured=true
      const products = await ProductService.getAllProducts(filters);
      res.status(200).json({ message: "All Prodduct", length: products.length, products });
    } catch (error) {
      next(error);
    }
  }
  static async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req?.params;
      const product = await ProductService.getProductById(id);

      res.status(200).json({ message: "One Prodduct", product });
    } catch (error) {
      next(error);
    }
  }
  static async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validateProduct = await validateProductDto(createProductSchema, req.body);
      const product = await ProductService.createProduct(validateProduct);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
  static async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const products = await ProductService.updateProduct(id, req.body);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
  static async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req?.params;
      console.log(id);
      await ProductService.deleteProduct(id);
      res.status(204).json({ message: `${id}'li ürün silindi` });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductContoller;
