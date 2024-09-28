import { useEffect, useState } from 'react';
import api from '../lib/axios'; // Importar instancia de Axios
import styles from './CreateMovement.module.css';
import { useProductContext } from '@/context/productContext';

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

export default function MovementEditForm({ onClose }: any) {
    const { selectedProduct } = useProductContext();
    const [products, setProducts] = useState<Product[]>([]);
    const [id, setId] = useState(selectedProduct?.id);
    const [product_id, setProduct_id] = useState(selectedProduct?.product_id);
    const [productsMovement, setProductsMovement] = useState<ProductMovement[]>([]);
    const [movement_type, setMovement_type] = useState(selectedProduct?.movement_type);
    const [quantity, setQuantity] = useState(selectedProduct?.quantity);

    const [errors, setErrors] = useState({
        quantity: '',
    });

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

    const validate = () => {
        let isValid = true;
        const newErrors = { quantity: '' };
        if (quantity < 1) {
            newErrors.quantity = 'La cantidad del producto debe ser mayor a 0';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    }

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { product_id, movement_type, quantity };

        try {
            if (validate()) {
                // Crear nuevo producto
                await api.put(`/inventory-movements/${id}`, data);
                alert('Movimiento actualizado correctamente');
                window.location.reload();
            } else {
                alert('Corrige los errores para continuar');
            }
        } catch (error) {
            console.error(error);
            alert('Hubo un error al procesar la solicitud');
        }
    };

    return (
        <div className='modal'>
            <form className={styles.form_container} onSubmit={handleEdit}>
                <h1>Editando movimiento</h1>
                <div className={styles.form_row}>
                    <label>
                        Productos
                        <br />
                        <select
                            value={id}
                            onChange={e => setId(e.target.value)}
                            className='w-full bg-white-700 px-4 py-2 rounded-md my-2'
                        >
                            {productsMovement.map(() => {
                                const productFound = products.find(p => p.id === product_id);
                                const productMovementFound = productsMovement.find(p => p.product_id === productFound?.id);
                                return (
                                    <option key={productMovementFound?.id} value={productMovementFound?.id}>{productFound?.name}</option>
                                );
                            })}
                        </select>
                    </label>
                    <label>
                        Tipo de movimiento
                        <br />
                        <select
                            value={movement_type}
                            onChange={e => setMovement_type(e.target.value)}
                            className='w-full bg-white-700 px-4 py-2 rounded-md my-2'
                        >
                            <option value='IN'>IN</option>
                            <option value='OUT'>OUT</option>
                        </select>
                    </label>
                    <label>
                        Cantidad
                        <br />
                        <input
                            type="number"
                            value={quantity}
                            onChange={e => setQuantity(Number(e.target.value))}
                            placeholder="Cantidad"
                            required
                            className='w-full bg-white-700 px-4 py-2 rounded-md my-2'
                        />
                        {errors.quantity && <p style={{ color: 'red' }}>{errors.quantity}</p>}
                    </label>
                </div>
                <div className={styles.buttons}>
                    <button type="submit" className='bg-indigo-500 px-5 py-3 rounded-md'>Actualizar movimiento</button>
                    <button type="button" className='bg-indigo-500 px-5 py-3 rounded-md' onClick={() => onClose()}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
