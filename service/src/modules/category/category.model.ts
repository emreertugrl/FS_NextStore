import { Document, Schema, model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

const Category = model<ICategory>("Category", CategorySchema);

export default Category;
