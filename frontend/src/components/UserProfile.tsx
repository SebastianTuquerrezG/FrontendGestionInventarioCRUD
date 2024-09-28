import { useEffect, useState } from 'react';
import api from '../lib/axios'; // Instancia de Axios para consumir la API
import { useUserContext } from '@/context/userContext';
import { useRouter } from 'next/router';
import styles from './User.Profile.module.css';

export default function UserProfile() {
    const { user, setUser, clearUser } = useUserContext();
    const [editing, setEditing] = useState(false);
    const [username, setUsername] = useState(user?.username || '');
    const [password, setPassword] = useState(user?.password || '');
    const router = useRouter();

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

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedUser = { username, password };
            if (user) {
                const response = await api.put(`/users/${user.id}`, updatedUser);
                setUser(response.data);
                alert('Perfil actualizado correctamente');
                setEditing(false);
            } else {
                alert('Usuario no encontrado');
            }
            setEditing(false);
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            alert('Hubo un error al actualizar el perfil');
        }
    };

    const handleDelete = async () => {
        if (confirm("¿Estás seguro de que quieres eliminar tu perfil?")) {
            try {
                if (user) {
                    await api.delete(`/users/${user.id}`);
                    alert('Perfil eliminado correctamente');
                    clearUser();
                    router.push('/log');
                } else {
                    alert('Usuario no encontrado');
                }
                clearUser();
                router.push('/log');
            } catch (error) {
                console.error('Error al eliminar el perfil:', error);
                alert('Hubo un error al eliminar el perfil');
            }
        }
    };

    return (
        <div className={styles.profileContainer}>
            <h1 className={styles.titulo}>Perfil de Usuario</h1>
            <h2 className={styles.role}>ROL: {user?.role}</h2>
            {editing ? (
                <form onSubmit={handleEdit}>
                    <label>
                        Nombre de Usuario
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Nueva Contraseña
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Actualizar</button>
                    <button type="button" onClick={() => setEditing(false)}>Cancelar</button>
                </form>
            ) : (
                <div className={styles.user}>
                    <p><strong>Nombre de Usuario:</strong> {user?.username}</p>
                    <p><strong>Contraseña:</strong> {user?.password}</p>
                    <button onClick={() => setEditing(true)}>Editar</button>
                    <button onClick={handleDelete}>Eliminar Perfil</button>
                </div>
            )}
        </div>
    );
}
