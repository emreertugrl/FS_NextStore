import Joi, { ObjectSchema } from "joi";

// Register Schema
export const createUserSchema: ObjectSchema<UserRegisterDto> = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Kullanıcı adı zorunludur",
    "any.required": "Kullanıcı adı zorunludur",
  }),
  name: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/u)
    .required()
    .messages({
      "string.empty": "İsim zorunludur",
      "any.required": "İsim zorunludur",
      "string.pattern.base": "İsim yalnızca harflerden ve boşluklardan oluşmalıdır",
    }),
  email: Joi.string().email().required().messages({
    "string.empty": "E-posta zorunludur",
    "string.email": "Geçersiz e-posta adresi",
    "any.required": "E-posta zorunludur",
  }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.\-#])[A-Za-z\d@$!%*?&.\-#]{8,}$/)
    .required()
    .messages({
      "string.empty": "Şifre zorunludur",
      "string.min": "Şifre en az 8 karakter uzunluğunda olmalı",
      "string.pattern.base":
        "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir",
      "any.required": "Şifre zorunludur",
    }),
});

// Login Schema (updated)
export const loginUserSchema: ObjectSchema<UserLoginDto> = Joi.object({
  username: Joi.string().messages({
    "string.empty": "Kullanıcı adı boş olamaz",
  }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.\-#])[A-Za-z\d@$!%*?&.\-#]{8,}$/)
    .required()
    .messages({
      "string.empty": "Şifre zorunludur",
      "string.min": "Şifre en az 8 karakter uzunluğunda olmalı",
      "string.pattern.base":
        "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir",
      "any.required": "Şifre zorunludur",
    }),
});

// DTO Interfaces
interface UserRegisterDto {
  username: string;
  name: string;
  email: string;
  password: string;
}

interface UserLoginDto {
  username: string;
  password: string;
}

// Validation Function
async function validateUserDto<T>(schema: ObjectSchema, data: T): Promise<T> {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true, // Ekstra alanları silmek için
  });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessages);
  }
  return value;
}

// Export
export { validateUserDto, UserRegisterDto, UserLoginDto };
