import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

export default function ProductsPage() {
    return (
        <div>
            <Navbar />
            <main>
                <h2>Gestión de Productos</h2>
                <ProductForm />
                <ProductList />
            </main>
            <Footer />
        </div>
    );
}
