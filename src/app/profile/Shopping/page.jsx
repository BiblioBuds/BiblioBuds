// "use client"
// import React, { useState } from "react"; // Importa React y useState
// import { Shopping as PaymentShopping } from "payment"; // Importa Shopping desde "payment"

// const ShoppingComponent = () => {
//   const [ultimaCompra, setUltimaCompra] = useState(""); // Usa el estado para la última compra
//   const [historialCompras, setHistorialCompras] = useState([]); // Usa el estado para el historial de compras

//   const agregarHistorial = () => {
//     setHistorialCompras([...historialCompras, ultimaCompra]);
//     setUltimaCompra(""); // Limpia el valor de la última compra después de agregarla al historial
//   };

//   return (
//     <div>
//       <section>
//         <h6>Última Compra</h6>
//         <section>{ultimaCompra}</section>
//       </section>

//       <section>
//         <h6>Historial</h6>
//         <button onClick={agregarHistorial}>Agregar al Historial</button>
//         <ul>
//           {historialCompras.map((compra, index) => (
//             <li key={index}>{compra}</li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default ShoppingComponent; // Exporta el componente corregido


