This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
Primero ejecuta el servidor que ofrece el servicio API que se encuentra aqui:
[Backend Gestion Crud](https://github.com/SebastianTuquerrezG/GestionInventarioCRUD)

```bash
    git clone https://github.com/SebastianTuquerrezG/FrontendGestionInventarioCRUD
    cd frontend
continue
    npm install
    npm run dev
```

Abre [http://localhost:3001](http://localhost:3001) en el buscador para ver el resultado
Se puede editar en vivo siendo la principal el Login, el punto de partida luego de loguearse pasa a index

Existen distintos endpoints, como
[http://localhost:3000/products](http://localhost:3000)
[http://localhost:3000/inventory-movements](http://localhost:3000/inventory-movements)
[http://localhost:3000/users](http://localhost:3000/users)


# Sistema de Gestion de Inventario

Este es la arquitectura de frontend que proporciona la parte visual para la administracion de inventario usando **React** y **Next** La aplicacion permite el manejo de productos, monitorear el nivel de stock, y el flujo de movimiento de los productos.

Para el frontend, hemos usado una arquitectura basada en componentes con Next.js y React. Next.js es un framework basado en React que facilita la creación de aplicaciones web con SSR (Server-Side Rendering) y SSG (Static Site Generation).

## Components:

### Componentes reutilizables:

* ProductForm: Un componente que maneja la lógica para crear o editar productos. Se comunica con la API usando axios para enviar los datos del formulario.
* ProductList: Muestra una lista de productos recuperados desde la API.
Navbar y Footer: Componentes reutilizables para la navegación y el pie de página.

### Páginas:

* ProductsPage: Es una página que contiene el formulario de creación/edición de productos y la lista de productos. Usa los componentes ProductForm y ProductList.

### Comunicación con la API:

* En el frontend, usamos axios para hacer peticiones HTTP al backend. Esto sigue el patrón de consumir una API REST. El frontend envía las solicitudes al backend, que responde con los datos, y el frontend los renderiza.

## Product_infrastructure:

* Controladores: Son los puntos de entrada de la API. Reciben las solicitudes HTTP, se las pasan a los servicios, y devuelven respuestas al cliente.
* Adaptadores de persistencia (TypeORM): Implementan la lógica de acceso a la base de datos usando TypeORM. Aquí es donde las interfaces de repositorio del Product_core se implementan realmente.


## Caracteristicas

- **Gestion de Productos:** Add, edit, and delete products.
- **Monitoreo de Stock:** View current stock levels and receive alerts when stock is low.
- **Historial de Inventario:** Track the history of inventory movements (stock in/out).
- **Buscar y Filtrar:** Easily search and filter products by different attributes.

## Ventajas de esta arquitectura en el frontend:
Modularidad: React y Next.js permiten la creación de componentes altamente reutilizables.
SSR y SSG: Gracias a Next.js, puedes tener renderizado en el servidor (SSR) o generar sitios estáticos (SSG), lo cual mejora la velocidad y SEO.
Separación de responsabilidades: Cada componente tiene su propia responsabilidad, facilitando la escalabilidad y el mantenimiento.

## Stack de Tecnologias

- **Frontend:**
  - React
  - Next.js API routes (for server-side logic)

- **Database:**
  - MySQL
