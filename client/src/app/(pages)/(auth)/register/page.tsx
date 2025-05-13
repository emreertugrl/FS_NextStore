"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

// Form verileri için tip tanımı
type RegisterFormValues = {
  username: string;
  name: string;
  email: string;
  password: string;
};

// Yup şeması
const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Kullanıcı adı zorunlu").trim(),
  name: Yup.string().required("İsim zorunlu").trim(),
  email: Yup.string().email("Geçersiz email").required("Email zorunlu").trim(),
  password: Yup.string().min(6, "Şifre en az 6 karakter olmalı").required("Şifre zorunlu").trim(),
});

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        toast.success("Kayıt başarılı");
        router.push("/login");
      } else {
        toast.error(data.message || "Kayıt başarısız");
      }
    } catch (err) {
      console.error(err);
      toast.error("Sunucu hatası");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10">
      <h1 className="text-xl font-semibold mb-4">Kayıt Ol</h1>

      <Formik
        initialValues={{
          username: "",
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex flex-col gap-4">
            <div>
              <Field
                name="username"
                placeholder="Kullanıcı adı"
                className="w-full px-3 py-2 border rounded"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field name="name" placeholder="Adınız" className="w-full px-3 py-2 border rounded" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Şifre"
                className="w-full px-3 py-2 border rounded"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Kayıt Ol
            </button>

            <p className="text-sm text-center">
              Zaten hesabınız var mı?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Giriş Yap
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
