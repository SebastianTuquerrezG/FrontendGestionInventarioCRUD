import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css'; // Asegúrate de importar el mismo CSS

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'ADMIN' | 'EMPLOYEE'>('EMPLOYEE');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/users', {
                username,
                password,
                role,
            });
            alert('Registration successful');
            await new Promise(resolve => setTimeout(resolve, 500));
            router.push('/login'); // Redirigir al login después del registro
        } catch (error) {
            console.error('Error registering:', error);
            alert('Error registering. Please try again.'); // Mensaje de error
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Registrarse</h1>
                <form onSubmit={handleRegister}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value as 'ADMIN' | 'EMPLOYEE')} className={styles.input}>
                            <option value="ADMIN">Admin</option>
                            <option value="EMPLOYEE">Employee</option>
                        </select>
                    </div>
                    <button type="submit" className={styles.loginButton}>
                        Registrarse
                    </button>
                </form>
                <p className={styles.text}>¿Ya tienes una cuenta?</p>
                <button onClick={() => router.push('/login')} className={styles.registerButton}>
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
};

export default Register;
