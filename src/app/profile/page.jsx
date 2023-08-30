"use client"
// import React from "react"; // Importa React
// import { getSession } from "next-auth/react";
// import { useSession } from "next-auth/react";
// import Shopping from "./shopping";

const Profile = () => {
    return (
        <div>
            
        </div>
    )
}
export default Profile;

// const Profile = ({ User, session }) => { // Corrige la declaración de los parámetros
//   const UserInfo = User;
//   const UserData = session;
//   const { data: userSession, status } = useSession(); // Cambia el nombre de la constante para evitar conflictos

//   return (
//     <div>
//       <section>
//         <h4>Profile Info</h4>
//         <h2>{UserData.user.name}</h2> {/* Cambia UserData.name a UserData.user.name */}
//         <p>{UserData.user.email}</p> {/* Cambia {}UserData.email a {UserData.user.email} */}
//       </section>
//       <button>Shopping</button>
//       <button>Searches</button>
//     </div>
//   );
// };

// export const getServerSideProps = async (context) => {
//   const session = await getSession(context);
//   return {
//     props: {
//       session, // Pasa la sesión al componente como prop
//     },
//   };
// };

// export default Profile;

// import { getSession } from "next-auth/react";

// export const getServerSideProps = async() =>{
//     const session = await getSession()
//     return{
//         props:{

//         }
//     }
// }

// import React from "react";

// const Profile = () => {
//   return <div>Profile</div>;
// };

// export default Profile;

/*-------------- Objeto user----------------
en la constante del peril se tiene que tener recibir {session}


expires: "xxxxxxxxxxxx"// esta propiedad nos dice cuando expira
user{
    email:"xxxxx",
    image:"xxxxx",
    name:"xxxxxx"
}
*/

