import Product from "./product.model.ts";
import Category from "../category/category.model.ts";
class ProductService {
  static async getAllProducts(filters: any) {
    try {
      const query: any = {};
      // 🔎 Filtreler
      // if (filters.category.name && mongoose.Types.ObjectId.isValid(filters.category)) {
      //   query.category = filters.category.name;
      // } embedding yönteminden dolayı çalışmıyor.
      if (filters.brand) query.brand = filters.brand;
      if (filters.isFeatured) query.isFeatured = filters.isFeatured === "true";
      if (filters.minPrice || filters.maxPrice) {
        query.price = {};
        if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
        if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
      }
      if (filters.search) {
        query.name = { $regex: filters.search, $options: "i" };
      }

      // 📌 Sıralama
      let sortBy = {};
      if (filters.sort) {
        const sortField = filters.sort.replace("-", ""); // örn: -price ➝ price
        const sortOrder = filters.sort.startsWith("-") ? -1 : 1; // -price ➝ desc
        sortBy = { [sortField]: sortOrder };
      }
      // 📄 Pagination
      //   const page = parseInt(filters.page) || 1;
      //   const limit = parseInt(filters.limit) || 10;
      //   const skip = (page - 1) * limit;
      //   // 📥 Verileri çek
      // const total = await Product.countDocuments(query);
      // const products = await Product.find(query).sort(sortBy).skip(skip).limit(limit);
      // return {
      //   total,
      //   page,
      //   limit,
      //   totalPages: Math.ceil(total / limit),
      //   products,
      // };
      const products = await Product.find(query).sort(sortBy).populate("category");

      return products;
    } catch (error) {
      throw error;
    }
  }

  static async getProductById(id: string) {
    try {
      const product = await Product.findById(id).populate("category");
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      throw error;
    }
  }
  static async createProduct(value: createProductSchema) {
    try {
      const existingProduct = await Product.findOne({
        name: value.name,
      });
      if (existingProduct) {
        throw new Error("Product already exits");
      }

      // 🔎 Category ID doğrulaması
      const categoryExists = await Category.findById(value.category);
      if (!categoryExists) {
        throw new Error("Invalid category ID");
      }

      const newProduct = new Product(value);

      await newProduct.save();

      return newProduct;
    } catch (error) {
      throw error;
    }
  }
  static async updateProduct(id: string, value: object) {
    try {
      const product = await Product.findByIdAndUpdate(id, value, { new: true });
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      throw error;
    }
  }
  static async deleteProduct(id: string) {
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product._id;
    } catch (error) {
      throw error;
    }
  }
}
export default ProductService;
