import { useEffect, useState } from 'react';
import api from '../lib/axios'; // Instancia de Axios para consumir la API

interface Product {
    id: number;
    name: string;
    category: string;
    quantity: number;
    price: number;
    description: string;
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Obtener todos los productos
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h3>Lista de Productos</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h4>{product.name}</h4>
                        <p>Categoría: {product.category}</p>
                        <p>Cantidad: {product.quantity}</p>
                        <p>Precio: {product.price}</p>
                        <p>Descripción: {product.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
