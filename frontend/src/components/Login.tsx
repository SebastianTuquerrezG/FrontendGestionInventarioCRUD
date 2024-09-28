// components/Login.tsx
import React from 'react';
import api from '../lib/axios';
import { useRouter } from 'next/router';
import LoginForm from './LoginForm';
import styles from '../styles/login.module.css';
import { useUserContext } from '@/context/userContext';

const Login: React.FC = () => {
    const router = useRouter();
    const {setUser} = useUserContext();

    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await api.post('/users/verify', {
                username,
                password,
            });

            if (response.data.success) {
                alert('Login successful');
                await new Promise(resolve => setTimeout(resolve, 500));
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('id_user', response.data.id);
                setUser(response.data);
                router.push('/'); // Redirigir después del login
            } else {
                alert('Invalid username or password');
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        } catch (error) {
            console.error('Error verifying login:', error);
            alert('An error occurred. Please try again.'); // Mensaje de error
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    };

    const handleRegisterRedirect = () => {
        router.push('/regist');
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Login</h1>
                <LoginForm onLogin={handleLogin} onRegisterRedirect={handleRegisterRedirect} />
            </div>
        </div>
    );
};

export default Login;
