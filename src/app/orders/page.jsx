"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Realiza una solicitud para obtener las órdenes del usuario
    axios.get('/api/orders')
      .then((response) => {
        // Al recibir la respuesta, actualiza el estado con las órdenes
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las órdenes:', error);
      });
  }, []); // El segundo argumento del useEffect ([]) asegura que esta solicitud se realice solo una vez al cargar el componente

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Mis Órdenes</h1>
      {orders.length === 0 ? (
        <p>No tienes órdenes.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="bg-white shadow-md rounded-lg p-4">
              <p className="text-lg font-semibold">Número de Pedido: {order.orderNumber}</p>
              <p className="text-gray-600">Fecha: {order.date}</p>
              <p className="mt-2 text-lg">Productos:</p>
              <ul className="list-disc ml-4">
                {order.products.map((product) => (
                  <li key={product.id}>
                    {product.name} - Cantidad: {product.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default Orders;
