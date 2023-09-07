"use client"
import { useEffect, useState } from "react";
import axios from "axios"
import OrdersTable from "./OrdersTable";
import { useSession } from "next-auth/react";

const Orders = () => {

    const { data: session, status } = useSession();
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

    const [orders, setOrders] = useState()

    useEffect(() => {
        axios
          .get("/api/orders")
          .then((res) => res.data)
          .then((data) => setOrders(data))
          console.log(orders)
    },[])

    return (
        <div>
            {isAdmin === "ADMIN"?
            <div>
                <OrdersTable orders={orders}/>
            </div>
            : 
            <div>
                <h1>Not Allowed</h1>
            </div>
            }       
        </div>
    )
}
export default Orders;