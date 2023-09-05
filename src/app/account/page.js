
"use client"
import { useSession } from "next-auth/react";
import { useState } from "react";

const AccountPage = () => {
  const { data: session } = useSession(); // Obtén la información de la sesión del usuario
  const [isEditing, setIsEditing] = useState(false); // Estado para habilitar la edición de la información

  if (!session) {
    // Si el usuario no está autenticado, muestra un mensaje o redirige a la página de inicio de sesión
    return <div className="text-center mt-10 text-lg">Debes iniciar sesión para ver esta página.</div>;
  }

  // Si el usuario está autenticado, muestra la información de la cuenta
  const { name, email } = session.user;
  const [firstName, setFirstName] = useState(name.split(" ")[0]); // Separa el nombre y el apellido
  const [lastName, setLastName] = useState(name.split(" ")[1]);

  // Función para guardar los cambios
  const saveChanges = () => {
    const updatedName = `${firstName} ${lastName}`;
    // Envía la información actualizada al servidor o a la base de datos aquí
    // Por ejemplo, puedes utilizar una llamada a la API para actualizar la información del perfil
    // A continuación, puedes manejar la lógica de actualización.
    console.log("Nombre actualizado:", updatedName);
    console.log("Correo electrónico actualizado:", email);
    setIsEditing(false); // Deshabilita la edición después de guardar los cambios
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg  ">
      <h1 className="text-2xl font-bold mb-4">¡Hola, {name.split(" ")[0]}!</h1>
      <div className="flex items-center justify-between">
      
        <div>
         
          <p className="text-lg font-semibold">PERFIL</p>
        </div>
        
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-lg">Nombre</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={!isEditing}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-lg">Apellido</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={!isEditing}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mt-3">
        <label className="block mb-2 text-lg  ">Correo Electrónico</label>
        <p className="text-lg w-full p-2 border rounded">{email}</p>
      </div>
      <button
  onClick={() => setIsEditing(!isEditing)}
  className="px-4 py-2 mt-3 text-white bg-violet-300 rounded-lg hover:bg-blue-600 focus:outline-none"
>
  {isEditing ? "Guardar Cambios" : "Editar"}
</button>
      {isEditing && (
        <div className="mt-4">
          {/* <button
            onClick={saveChanges}
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none mr-4"
          >
            Guardar Cambios
          </button> */}
          <button
            onClick={() => setIsEditing(false)}
            className="px-4  py-2 text-white bg-blue-200 rounded-lg hover:bg-red-600 focus:outline-none"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;

