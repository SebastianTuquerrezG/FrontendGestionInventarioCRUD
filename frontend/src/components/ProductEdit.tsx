import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Para obtener el ID del producto desde la ruta
import api from '../lib/axios'; // Importar instancia de Axios
import styles from './ProductForm.module.css';
import { useProductContext } from '@/context/productContext';

interface Product {
    id: number;
    name: string;
    category: string;
    quantity: number;
    price: number;
    description: string;
}

export default function ProductEditForm({ onClose }: any) {
    const { selectedProduct } = useProductContext();
    const [name, setName] = useState(selectedProduct?.name);
    const [category, setCategory] = useState(selectedProduct?.category);
    const [quantity, setQuantity] = useState(selectedProduct?.quantity);
    const [price, setPrice] = useState(selectedProduct?.price);
    const [description, setDescription] = useState(selectedProduct?.description);

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedProduct = {
                name,
                category,
                quantity,
                price,
                description,
            };
            await api.put(`/products/${selectedProduct.id}`, updatedProduct);
            alert('Producto actualizado correctamente');
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            alert('Hubo un error al actualizar el producto');
        }
    };

    return (
        <div className='modal-overlay'>
            <form className={styles.form_container} onSubmit={handleEdit}>
                <h1>Editando producto</h1>
                <div className={styles.form_row}>
                    <label>
                        Nombre
                        <br />
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Nombre"
                            required
                            className='w-full bg-white-700 px-4 py-2 rounded-md my-2'
                        />
                    </label>
                    <label>
                        Categoria
                        <br />
                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className='w-full bg-white-700 px-4 py-2 rounded-md my-2'
                        >
                            <option value="Tarjeta Grafica">Tarjeta Grafica</option>
                            <option value="Memoria RAM">Memoria RAM</option>
                            <option value="Refrigeracion liquida">Refrigeracion liquida</option>
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
                    </label>
                    <label>
                        Precio
                        <br />
                        <input
                            type="number"
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                            placeholder="Precio"
                            required
                            className='w-full bg-white-700 px-4 py-2 rounded-md my-2'
                        />
                    </label>
                    <label>
                        Descripción
                        <br />
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Descripción"
                            required
                            className='w-full bg-white-700 px-4 py-2 rounded-md my-2'
                        />
                    </label>
                </div>
                <div className={styles.buttons}>
                    <button type="submit" className='bg-indigo-500 px-5 py-3 rounded-md'>Actualizar producto</button>
                    <button type="button" className='bg-indigo-500 px-5 py-3 rounded-md' onClick={() => onClose()}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
