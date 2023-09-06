"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const AccountPage = () => {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (status === "authenticated") {
      setUserData({ name: session.user.name, email: session.user.email });
    }
  }, [session, status]);

  if (!session) {
    return (
      <div className="text-center mt-10 text-lg">
        You must login first to be able to see this page.
      </div>
    );
  }
  const saveChanges = () => {
    console.log("Updated name:", updatedName);
    // console.log("Email updated:", email);
    setIsEditing(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">
        Hi, {userData.name ? userData.name.split(" ")[0] : "user"}!
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
            setUserData({ ...userData, [e.target.name]: e.target.value })
          }
          disabled={!isEditing}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mt-3">
        <label className="block mb-2 text-lg  ">Correo Electrónico</label>
        <p className="text-lg w-full p-2 border rounded">{userData.email}</p>
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
