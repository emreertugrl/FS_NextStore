"use client";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";
import store from "@/store";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Header />
      {children}
    </Provider>
  );
}
