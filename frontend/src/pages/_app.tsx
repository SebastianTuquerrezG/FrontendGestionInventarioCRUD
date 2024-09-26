import { useEffect } from "react";
import { useRouter } from "next/router";
import { ProductProvider } from "@/context/productContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [router]);

  return (
    <ProductProvider>
      <Component {...pageProps} />
    </ProductProvider>
  );
}
