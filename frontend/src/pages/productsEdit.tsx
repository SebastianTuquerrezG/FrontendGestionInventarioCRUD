import Navbar from "../components/Navbar";
import ProductEdit from "../components/ProductEdit";
import Footer from "../components/Footer";
import styles from "../styles/products.module.css";

export default function ProductsPage() {
    return (
        <div>
            <Navbar />
            <main>
                <h2 className={styles.titulo}>Editando producto</h2>
                <ProductEdit />
            </main>
            <Footer />
        </div>
    );
}
