import { useEffect } from "react";
import { useRouter } from "next/router";
import { ProductProvider } from "@/context/productContext";
import { UserProvider } from "@/context/userContext"; // Importa el UserProvider
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      if(router.pathname !== "/log" && router.pathname !== "/regist"){
        router.push("/log");
      }
    }
  }, [router]);

  return (
    <UserProvider> {/* Envuelve en UserProvider */}
      <ProductProvider>
        <Component {...pageProps} />
      </ProductProvider>
    </UserProvider>
  );
}
