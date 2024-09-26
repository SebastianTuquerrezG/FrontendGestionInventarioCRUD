import Link from "next/link";
import { FaStore, FaSignOutAlt } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter(); // Usa el hook useRouter

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token de localStorage
    router.push('/log'); // Redirige al login
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link href="/" className={styles.navTitleLink}>
          <div className={styles.titleContainer}>
            <FaStore className={styles.icon} />
            <b>
              <h1 className={styles.navTitle}>Mi Tienda</h1>
            </b>
          </div>
        </Link>
      </div>
      <div className={styles.navRight}>        
        <Link href="/profile">
          <button className={styles.navButton}>Gestionar Usuario</button>
        </Link>
        <Link href="/products">
          <button className={styles.navButton}>Gestionar Productos</button>
        </Link>
        <Link href="/movements">
          <button className={styles.navButton}>Gestionar Movimientos</button>
        </Link>
        <button onClick={handleLogout} className={styles.navButton}>
          <FaSignOutAlt className={styles.logoutIcon} />
        </button>
      </div>
    </nav>
  );
}
