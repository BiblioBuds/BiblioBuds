"use client"
import { useEffect, useState } from "react";
import axios from "axios"
import UsersTable from "./UsersTable";


const Users = () => {
    const [users, setUsers] = useState()

    useEffect(() => {
        axios
          .get("/api/users")
          .then((res) => res.data)
          .then((data) => setUsers(data))
    },[])

    return (
        <div>
            <UsersTable users={users}/>
        </div>
    )
}
export default Users;