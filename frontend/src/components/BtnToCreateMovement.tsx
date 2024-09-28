import { useUserContext } from "@/context/userContext";
import { useState } from "react";
import { createPortal } from "react-dom";
import CreateNewMovement from "./CreateNewMovement";

export default function BtnToCreateMovement(){
    const {user} = useUserContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            {user?.role == 'ADMIN' && 
                <button
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                    style={{margin: '20px', marginLeft: 'auto',padding: '5px 10px', display:'flex',backgroundColor: 'indigo', alignItems:'flex-end',color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                >
                    Crear movimiento
                </button>
            }
            {isModalOpen && createPortal(
                <CreateNewMovement onClose={() => setIsModalOpen(false)}/>,
                document.body
            )}
        </div>
    );
}