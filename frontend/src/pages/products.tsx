import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import styles from "../styles/products.module.css";

export default function ProductsPage() {
    return (
        <div>
            <Navbar />
            <main>
                <h2 className={styles.titulo}>Gestión de Productos</h2>
                <ProductForm />
                <ProductList />
            </main>
            <Footer />
        </div>
    );
}
