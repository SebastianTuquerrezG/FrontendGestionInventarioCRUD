import { useEffect, useState, Fragment } from 'react';
import api from '../lib/axios'; // Instancia de Axios para consumir la API
import styles from './ProductList.module.css';
import PortalToEdit from './PortalToEdit';
import { useUserContext } from '@/context/userContext';
import React from 'react';

interface Product {
    id: number;
    name: string;
    category: string;
    quantity: number;
    price: number;
    description: string;
}

export default function ProductList() {
    const { user } = useUserContext();
    const [products, setProducts] = useState<Product[]>([]);
    const classContainer = 'clipping-container';

    useEffect(() => {
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
        <div className={styles.list_container}>
            <h3>Lista de Productos</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h4>{product.name}</h4>
                        <p>Categoría: {product.category}</p>
                        <p>Cantidad: {product.quantity}</p>
                        <p>Precio: $ {product.price}</p>
                        <p>Descripción: {product.description}</p>
                        <>
                            {user?.role == 'ADMIN' &&
                                <div className={`${classContainer} ${styles.buttons}`}>
                                    <PortalToEdit
                                        product={product}
                                    />
                                    <button
                                        onClick={() => onDelete(product.id)}
                                        style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            }
                        </>
                    </li>
                ))}
            </ul>
        </div>
    );
}
