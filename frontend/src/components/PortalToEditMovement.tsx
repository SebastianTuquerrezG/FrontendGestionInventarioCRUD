import { useUserContext } from "@/context/userContext";
import { useState } from "react";
import { createPortal } from "react-dom";
import MovementEditForm from "./MovementEditForm";
import React from "react";

export default function PortalToEditMovement() {
    const { user } = useUserContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            {user?.role == 'ADMIN' &&
                <>
                    <span
                        onClick={() => setIsModalOpen(true)}
                        style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Editar
                    </span>
                </>
            }
            {isModalOpen && createPortal(
                <MovementEditForm onClose={() => setIsModalOpen(false)} />,
                document.body
            )}
        </div>
    );
}