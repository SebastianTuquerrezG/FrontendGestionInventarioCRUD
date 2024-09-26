// components/Register.tsx
import React from 'react';
import api from '../lib/axios';
import { useRouter } from 'next/router';
import RegisterForm from './RegisterForm';
import styles from '../styles/login.module.css';

const Register: React.FC = () => {
    const router = useRouter();

    const handleRegister = async (username: string, password: string, role: 'ADMIN' | 'EMPLOYEE') => {
        try {
            await api.post('/users', {
                username,
                password,
                role,
            });
            alert('Registration successful');
            await new Promise(resolve => setTimeout(resolve, 500));
            router.push('/log'); // Redirigir al login después del registro
        } catch (error) {
            console.error('Error registering:', error);            
            alert('Error registering. Please try again.'); // Mensaje de error
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Registrarse</h1>
                <RegisterForm onRegister={handleRegister} />
                <p className={styles.text}>¿Ya tienes una cuenta?</p>
                <button onClick={() => router.push('/log')} className={styles.registerButton}>
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
};

export default Register;
