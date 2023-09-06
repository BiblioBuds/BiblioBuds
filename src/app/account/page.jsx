"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const AccountPage = () => {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });
  

  useEffect(() => {
    if (status === 'authenticated' && session.user) {
      setUserData({ name: session.user.name, email: session.user.email });
    }
  }, [session, status]);

  const saveChanges = () => {
    // Guarda el nombre en localStorage
    localStorage.setItem('user_name', userData.name);
    setIsEditing(false);
  };

  if (!session) {
    return (
      <div className="text-center mt-10 text-lg">
        You must login first to be able to see this page.
      </div>
    );
  }

  
  return (
    
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          Hi, {isEditing ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="text-lg font-bold focus:outline-none border-b border-blue-500"
            />
          ) : (
            userData.name || "user"
          )}!
        </h1>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">PROFILE</p>
          </div>
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-lg">Name</label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData({ ...userData, name: e.target.value })
            }
            disabled={!isEditing}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mt-3">
          <label className="block mb-2 text-lg">Correo Electrónico</label>
          <p className="text-lg w-full p-2 border rounded">{userData.email}</p>
        </div>
        {isEditing ? (
          <div className="mt-4">
            <button
              onClick={saveChanges}
              className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none mr-4"
            >
              Guardar Cambios
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-white bg-purple-200 rounded-lg hover:bg-red-600 focus:outline-none"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-white bg-purple-200 rounded-lg hover:bg-blue-300 focus:outline-none"
          >
            Editar
          </button>
        )}
      </div>
    );
  };
export default AccountPage;
