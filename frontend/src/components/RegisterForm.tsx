// components/RegisterForm.tsx
import React, { useState } from 'react';
import styles from '../styles/login.module.css';

interface RegisterFormProps {
    onRegister: (username: string, password: string, role: 'ADMIN' | 'EMPLOYEE') => Promise<void>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'ADMIN' | 'EMPLOYEE'>('EMPLOYEE');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onRegister(username, password, role);
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
    );
};

export default RegisterForm;
