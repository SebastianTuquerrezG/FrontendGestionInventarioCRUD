import { useEffect, useState } from 'react';
import api from '../lib/axios'; // Instancia de Axios para consumir la API
import styles from './ProductsMovements.module.css';
import { useProductContext } from '@/context/productContext';
import { useUserContext } from '@/context/userContext';
import PortalToEditMovement from './PortalToEditMovement';

interface Product {
    id: number;
    name: string;
    category: string;
    quantity: number;
    price: number;
    description: string;
}

interface ProductMovement {
    id: number;
    product_id: number;
    movement_type: string;
    quantity: number;
    movement_date: string;
}

export default function ProductMovement() {
    const { user } = useUserContext();
    const [products, setProducts] = useState<Product[]>([]);
    const [productsMovement, setProductsMovement] = useState<ProductMovement[]>([]);
    const { setSelectedProduct } = useProductContext();
    const classContainer = 'clipping-container';

    useEffect(() => {
        // Obtener todos los productos
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                const responseMovement = await api.get('/inventory-movements');
                setProducts(response.data);
                setProductsMovement(responseMovement.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (product: ProductMovement) => {
        setSelectedProduct(product);
    }

    const onDelete = async (id: number) => {
        try {
            await api.delete(`/inventory-movements/${id}`);
            alert('Movimiento eliminado correctamente');
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
                    {productsMovement.length > 0 ? (productsMovement.map((product) => {
                        const productName = products.find(p => p.id === product.product_id)?.name;
                        return (
                            <tr key={product.id}>
                                <td style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>{productName}</td>
                                <td style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid #ddd' }}>
                                    <>
                                        {user?.role == 'ADMIN' &&
                                            <div className={`${classContainer} ${styles.buttons}`}>
                                                <button onClick={() => handleEdit(product)}>
                                                    <PortalToEditMovement/>
                                                </button>
                                                <button
                                                    onClick={() => onDelete(product.id)}
                                                    style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        }
                                        {user?.role == 'EMPLOYEE' &&
                                            <div>
                                                <p>Acciones no permitidas</p>
                                            </div>
                                        }
                                    </>
                                </td>
                            </tr>
                        );
                    })) : (
                        <tr>
                            <td>No hay movimientos registrados</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
