import {getSession} from 'next-auth/react';



export const getServerSideProps = async() =>{
    const session = await getSession()
    return{
        props:{

        }
    }
}

/*-------------- Objeto user----------------
en la constante del peril se tiene que tener recibir {session}


expires: "xxxxxxxxxxxx"// esta propiedad nos dice cuando expira
user{
    email:"xxxxx",
    image:"xxxxx",
    name:"xxxxxx"
}
*/