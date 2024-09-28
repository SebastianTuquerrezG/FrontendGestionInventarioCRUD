import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import styles from "../styles/products.module.css";
import KnowRoleOfUser from '../components/KnowRoleOfUser';

export default function ProductsPage() {
    return (
        <div>
            <Navbar />
            <main>
                <h2 className={styles.titulo}>Gestión de Productos</h2>
                <KnowRoleOfUser/>
                <ProductForm />
                <ProductList />
            </main>
            <Footer />
        </div>
    );
}
