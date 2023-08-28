// import { getSession } from "next-auth/react";

// export const getServerSideProps = async() =>{
//     const session = await getSession()
//     return{
//         props:{

//         }
//     }
// }

import React from "react";

const Profile = () => {
  return <div>Profile</div>;
};

export default Profile;

/*-------------- Objeto user----------------
en la constante del peril se tiene que tener recibir {session}


expires: "xxxxxxxxxxxx"// esta propiedad nos dice cuando expira
user{
    email:"xxxxx",
    image:"xxxxx",
    name:"xxxxxx"
}
*/
