"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { toast } from "react-toastify";
import * as Yup from "yup";
const LoginSchema = Yup.object().shape({
  username: Yup.string().required("username zorunlu").trim(),
  password: Yup.string().min(6, "Şifre en az 6 karakter olmalı").required("Şifre zorunlu").trim(),
});

export default function LoginPage() {
  const handleSubmit = async (values: any) => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log(data);

      // Giriş başarılıysa token'ı sakla
      if (res.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        toast.success("Giriş başarılı");
      } else {
        alert(data.message || "Giriş başarısız");
      }
    } catch (err) {
      console.error(err);
      alert("Sunucu hatası");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10">
      <h1 className="text-xl font-semibold mb-4">Giriş Yap</h1>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex flex-col gap-4">
            <div>
              <Field
                name="username"
                placeholder="Username"
                className="w-full px-3 py-2 border rounded"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
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
              Giriş Yap
            </button>
            <div>
              <Link href={"/register"}>Kayıt olmak için </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
