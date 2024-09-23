import React, { createContext, useState, useContext, ReactNode } from 'react';


const ProductContext = createContext<any>(null);


export function ProductProvider({ children }: { children: ReactNode }) {
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
            {children}
        </ProductContext.Provider>
    );
}


export function useProductContext() {
    return useContext(ProductContext);
}
