import { useUserContext } from "@/context/userContext";
import api from "@/lib/axios";
import { useEffect } from "react";

export default function KnowRoleOfUser() {
    const {user, setUser} = useUserContext();
    useEffect(() => {
        const fetchUserData = async () => {

            try {
                const id_user = await localStorage.getItem('id_user');
                if (id_user) {
                    const response = await api.get(`/users/${Number(id_user)}`);
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };
        fetchUserData();
    }, [user]);

    return(
        <div></div>
    );
}