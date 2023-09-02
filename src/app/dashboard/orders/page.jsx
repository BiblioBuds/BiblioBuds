"use client"
import { useEffect, useState } from "react";
import axios from "axios"
import OrdersTable from "./OrdersTable";


const Orders = () => {
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
            <OrdersTable orders={orders}/>
        </div>
    )
}
export default Orders;