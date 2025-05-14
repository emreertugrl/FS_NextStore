"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

type RegisterFormValues = {
  username: string;
  name: string;
  email: string;
  password: string;
};

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Kayıt Ol
        </h1>

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
            <Form className="space-y-5">
              {/* Username */}
              <div>
                <Field
                  name="username"
                  placeholder="Kullanıcı adı"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Name */}
              <div>
                <Field
                  name="name"
                  placeholder="Adınız"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Email */}
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Password */}
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Şifre"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Kayıt Ol
              </button>

              <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                Zaten hesabınız var mı?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Giriş Yap
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
