import React from "react"; // Importa React
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import Shopping from "./shopping";

const Profile = ({ User, session }) => { // Corrige la declaración de los parámetros
  const UserInfo = User;
  const UserData = session;
  const { data: userSession, status } = useSession(); // Cambia el nombre de la constante para evitar conflictos

  return (
    <div>
      <section>
        <h4>Profile Info</h4>
        <h2>{UserData.user.name}</h2> {/* Cambia UserData.name a UserData.user.name */}
        <p>{UserData.user.email}</p> {/* Cambia {}UserData.email a {UserData.user.email} */}
      </section>
      <button>Shopping</button>
      <button>Searches</button>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session, // Pasa la sesión al componente como prop
    },
  };
};

export default Profile;
