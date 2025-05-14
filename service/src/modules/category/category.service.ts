import Category from "./category.model.ts";

class CategoryService {
  static async getAllCategories(filters: any) {
    try {
      const query: any = {};
      // 🔎 Filtreler
      if (filters.category) query.category = filters.category;

      // 📌 Sıralama
      let sortBy = {};
      if (filters.sort) {
        const sortField = filters.sort.replace("-", ""); // örn: -price ➝ price
        const sortOrder = filters.sort.startsWith("-") ? -1 : 1; // -price ➝ desc
        sortBy = { [sortField]: sortOrder };
      }

      const categories = await Category.find(query).sort(sortBy);

      return {
        categories,
      };
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  }

  static async getCategoryById(id: string) {
    try {
      const category = await Category.findById(id);
      if (!category) {
        throw new Error("Category not found");
      }
      return category;
    } catch (error) {
      throw new Error(`Failed to fetch category by ID: ${error.message}`);
    }
  }

  static async createCategory(value: string) {
    try {
      const existingCategory = await Category.findOne({ name: value.category });
      if (existingCategory) {
        throw new Error("Category already exists");
      }

      const newCategory = new Category(value);
      await newCategory.save();

      return newCategory;
    } catch (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }
  }

  static async updateCategory(id: string, value: object) {
    try {
      const category = await Category.findByIdAndUpdate(id, value, { new: true });
      if (!category) {
        throw new Error("Category not found");
      }
      return category;
    } catch (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }
  }

  static async deleteCategory(id: string) {
    try {
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        throw new Error("Category not found");
      }
      return category._id;
    } catch (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }
}

export default CategoryService;
