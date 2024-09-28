import { useState } from "react";
import ProductEditForm from "./ProductEdit";
import { createPortal } from "react-dom";
import { useProductContext } from "@/context/productContext";

export default function PortalToEdit({ product }: any) {
    const { setSelectedProduct } = useProductContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => {
                    setIsModalOpen(true);
                    setSelectedProduct(product);
                }}
                style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Editar
            </button>
            {isModalOpen && createPortal(
                <ProductEditForm onClose={() => setIsModalOpen(false)} />,
                document.body
            )}
        </div>
    );
}