import { Request, Response, NextFunction } from "express";
import CategoryService from "./category.service.ts";

// Kullanıcı kaydı
class CategoryContoller {
  static async getAllCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filters = req.query; // örn: ?category=phone&isFeatured=true
      const categories = await CategoryService.getAllCategories(filters);
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req?.params;
      const category = await CategoryService.getCategoryById(id);

      res.status(200).json({ message: "One Category", category });
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const category = await CategoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      console.log(id);
      const category = await CategoryService.updateCategory(id, req.body);
      res.status(200).json({ message: "Category updated successfully", category });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req?.params;
      await CategoryService.deleteCategory(id);
      res.status(204).json({ message: `${id} category deleted successfully` });
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryContoller;
