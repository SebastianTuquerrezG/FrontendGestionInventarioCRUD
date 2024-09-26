// components/LoginForm.tsx
import React, { useState } from 'react';
import styles from '../styles/login.module.css';

interface LoginFormProps {
    onLogin: (username: string, password: string) => Promise<void>;
    onRegisterRedirect: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onRegisterRedirect }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onLogin(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <p className={styles.text}>¿No tienes una cuenta?</p>
            <button type="button" onClick={onRegisterRedirect} className={styles.registerButton}>
                Registrarse
            </button>
        </form>
    );
};

export default LoginForm;
