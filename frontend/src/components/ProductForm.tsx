import { useState } from 'react';
import api from '../lib/axios'; // Importar instancia de Axios
import styles from './ProductForm.module.css';
import ProductList  from './ProductList';

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
    const [category, setCategory] = useState('Tarjeta Grafica');
    const [quantity, setQuantity] = useState(product?.quantity || 0);
    const [price, setPrice] = useState(product?.price || 0);
    const [description, setDescription] = useState(product?.description || '');

    const [errors, setErrors] = useState({
        name: '',
        quantity: '',
        price: '',
    });


    const validate = () => {
        let isValid = true;
        const newErrors = {name: '', quantity: '', price: ''};
        if(name.trim() === ''){
            newErrors.name = 'El nombre del producto es requerido';
            isValid = false;
        }
        if(quantity < 1){
            newErrors.quantity = 'La cantidad del producto debe ser mayor a 0';
            isValid = false;
        }
        if(price < 1){
            newErrors.price = 'La cantidad del producto debe ser mayor a 0';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { name, category, quantity, price, description };

        try {
            if(validate()){
                if (product) {
                    // Editar producto
                    await api.put(`/products/${product.id}`, data);
                    alert('Producto actualizado correctamente');
                } else {
                    // Crear nuevo producto
                    await api.post('/products', data);
                    alert('Producto creado correctamente');
                    window.location.reload();
                }
            }else{
                alert('Corrige los errores para continuar');
            }            
        } catch (error) {
            console.error(error);
            alert('Hubo un error al procesar la solicitud');
        }
    };

    return (
        <form className={styles.form_container} onSubmit={handleSubmit}>
            <div className={styles.form_row}>
                <label>
                    Nombre
                    <br />
                    <input
                        type="text"
                        id='name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Name"
                        className='w-full bg-white-700 px-4 py-2 rounded-md my-2'
                        required
                    />
                    {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
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
                        placeholder="Quantity"
                        className='w-full bg-white-700 px-4 py-2 rounded-md my-2'
                        required
                    />
                    {errors.quantity && <p style={{color: 'red'}}>{errors.quantity}</p>}
                </label>
                <label>
                    Precio
                    <br />
                    <input
                        type="number"
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        placeholder="Price"
                        required
                        className='w-full bg-white-700 px-4 py-2 rounded-md my-2'
                    />
                    {errors.price && <p style={{color: 'red'}}>{errors.price}</p>}
                </label>
                <label>
                    Descripción
                    <br />
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Description"
                        className='w-full bg-white-700 px-4 py-2 rounded-md my-2'
                        required
                    />
                </label>
            </div>
            <button type="submit" className='bg-indigo-500 px-5 py-3 rounded-md'>Guardar producto</button>
        </form>
    );
}
