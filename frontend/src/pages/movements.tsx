import Navbar from "../components/Navbar";
import ProductMovement from '../components/ProductsMovements';
import Footer from "../components/Footer";
import styles from "../styles/products.module.css";

export default function MovementsPage() {
    return (
        <div>
            <Navbar />
            <main>
                <h2 className={styles.titulo}>Productos almacenados</h2>
                <ProductMovement />
            </main>
            <Footer />
        </div>
    );
}
