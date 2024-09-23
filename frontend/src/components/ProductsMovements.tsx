import { useEffect, useState } from 'react';
import api from '../lib/axios'; // Instancia de Axios para consumir la API
import styles from './ProductsMovements.module.css';
import Link from 'next/link';
import { useProductContext } from '@/context/productContext';
import router from 'next/router';

interface Product {
    id: number;
    name: string;
}

export default function ProductMovement() {
    const [products, setProducts] = useState<Product[]>([]);
    const { setSelectedProduct } = useProductContext();

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


    const handleEdit = (product: Product) => {
        setSelectedProduct(product); // Almacenar el producto seleccionado en el contexto
        // Navegar a la página de edición (sin necesidad de pasar el ID)
        router.push('/productsEdit');
    };

    const onDelete = async (id: number) => {
        try {
            await api.delete(`/products/${id}`);
            alert('Producto eliminado correctamente');
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.movements}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                    <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #ddd' }}>Nombre del Producto</th>
                    <th style={{ padding: '8px', borderBottom: '2px solid #ddd' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                    <tr key={product.id}>
                        <td style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>{product.name}</td>
                        <td style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid #ddd' }}>
                        <button
                                onClick={() => handleEdit(product)}
                                style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Editar
                            </button>
                        <button
                            onClick={() => onDelete(product.id)}
                            style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Eliminar
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
