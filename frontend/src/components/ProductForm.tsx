import { useState } from 'react';
import api from '../lib/axios'; // Importar instancia de Axios

interface ProductFormProps {
    product?: {
        id: number;
        name: string;
        category: string;
        quantity: number;
        price: number;
        description: string;
    };
}

export default function ProductForm({ product }: ProductFormProps) {
    const [name, setName] = useState(product?.name || '');
    const [category, setCategory] = useState(product?.category || '');
    const [quantity, setQuantity] = useState(product?.quantity || 0);
    const [price, setPrice] = useState(product?.price || 0);
    const [description, setDescription] = useState(product?.description || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { name, category, quantity, price, description };

        try {
            if (product) {
                // Editar producto
                await api.put(`/products/${product.id}`, data);
                alert('Producto actualizado correctamente');
            } else {
                // Crear nuevo producto
                await api.post('/products', data);
                alert('Producto creado correctamente');
            }
        } catch (error) {
            console.error(error);
            alert('Hubo un error al procesar la solicitud');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Name"
                required
            />
            <input
                type="text"
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="Category"
                required
            />
            <input
                type="number"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                placeholder="Quantity"
                required
            />
            <input
                type="number"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                placeholder="Price"
                required
            />
            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Description"
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
}
