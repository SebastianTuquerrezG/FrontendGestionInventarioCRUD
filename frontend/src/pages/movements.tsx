import Navbar from "../components/Navbar";
import ProductMovement from '../components/ProductsMovements';
import Footer from "../components/Footer";
import styles from "../styles/products.module.css";
import KnowRoleOfUser from '../components/KnowRoleOfUser';
import BtnToCreateMovement from '../components/BtnToCreateMovement';

export default function MovementsPage() {
    return (
        <div>
            <Navbar />
            <main>
                <h2 className={styles.titulo}>Productos almacenados</h2>
                <KnowRoleOfUser/>
                <BtnToCreateMovement/>
                <ProductMovement />
            </main>
            <Footer />
        </div>
    );
}
