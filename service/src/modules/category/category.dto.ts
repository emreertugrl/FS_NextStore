import Joi, { ObjectSchema } from "joi";

// 📌 DTO Interfaces
export interface ProductCreateDto {
  name: string;
  description: string;
  price: number;
  image: string;
  brand?: string;
  category?: string;
  countInStock: number;
  isFeatured?: boolean;
}

// 🧪 Create Product Validation Schema
export const createProductSchema: ObjectSchema<ProductCreateDto> = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Ürün adı zorunludur",
    "any.required": "Ürün adı zorunludur",
  }),
  description: Joi.string().trim().required().messages({
    "string.empty": "Açıklama zorunludur",
    "any.required": "Açıklama zorunludur",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Fiyat sayısal olmalıdır",
    "number.positive": "Fiyat pozitif bir sayı olmalıdır",
    "any.required": "Fiyat zorunludur",
  }),
  image: Joi.string().uri().required().messages({
    "string.empty": "Görsel URL zorunludur",
    "string.uri": "Geçerli bir görsel URL giriniz",
    "any.required": "Görsel URL zorunludur",
  }),
  brand: Joi.string().optional(),
  category: Joi.string().optional(),
  countInStock: Joi.number().min(0).required().messages({
    "number.base": "Stok sayısı bir sayı olmalıdır",
    "number.min": "Stok sayısı negatif olamaz",
    "any.required": "Stok sayısı zorunludur",
  }),
  isFeatured: Joi.boolean().optional(),
});

// ✅ Validation Function
export async function validateProductDto<T>(schema: ObjectSchema, data: T): Promise<T> {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessages);
  }

  return value;
}
