"use client"
import { useEffect, useState } from "react";
import axios from "axios"
import UsersTable from "./UsersTable";
import { useGlobalContext } from "@/app/Context/store";
import { useSession } from "next-auth/react";




const Users = () => {
    const { data: session, status } = useSession();
    const { users } = useGlobalContext();
    
    // const [users, setUsers] = useState()

    // useEffect(() => {
    //     axios
    //       .get("/api/users")
    //       .then((res) => res.data)
    //       .then((data) => setUsers(data))
    // },[])

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (session) {
          let userId = session.user.id;
          axios
            .get("/api/users/admin?" + userId)
            .then((res) => res.data)
            .then((data) => setIsAdmin(data.role));
          // console.log(isAdmin)
        }
      }, [status, isAdmin]);

    return (
        <div>
            {isAdmin === "ADMIN"?
                <div>
                    <UsersTable users={users}/>
                </div>
                : 
                <div>
                    <h1>Not Allowed</h1>
                </div>
            }
        </div>
        
    )
}
export default Users;