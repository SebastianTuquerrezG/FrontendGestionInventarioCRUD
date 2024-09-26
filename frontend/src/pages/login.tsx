import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const response = await axios.post('http://localhost:3000/users/verify', {
            username,
            password,
        });

        if (response.data.success) {
            alert('Login successful');
            localStorage.setItem('token', response.data.token);
            router.push('/');
        } else {
            alert('Invalid username or password');
        }
        } catch (error) {
        console.error('Error verifying login:', error);
        alert('An error occurred. Please try again.');
        }
    };

    const handleRegisterRedirect = () => {
        router.push('/register');
    };

    return (
        <div className={styles.container}>
        <div className={styles.card}>
            <h1 className={styles.title}>Login</h1>
            <form onSubmit={handleLogin}>
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
            <button type="submit" className={styles.loginButton}>
                Login
            </button>
            </form>
            <p className={styles.text}>¿No tienes una cuenta?</p>
            <button onClick={handleRegisterRedirect} className={styles.registerButton}>
            Registrarse
            </button>
        </div>
        </div>
    );
};

export default Login;
