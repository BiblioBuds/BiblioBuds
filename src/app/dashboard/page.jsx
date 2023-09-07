"use client"
import { useEffect, useState } from "react";
import axios from "axios"
import { useGlobalContext } from "@/app/Context/store";
import LineChart from "./LineChart";
import  BarChart from "./BarChart";
import SpeedDialAdmin from "@/components/SpeedDial/SpeedDial";


const Dashboard = () => {
    const { orders, users } = useGlobalContext();
    console.log(orders)

    // Line chart Info//
    const clearData = orders?.map(element => {
        return {date: element.date.slice(0,10), price: element.totalPrice};
    })

    const result = {};
    clearData?.forEach(item => {
        const { date, price } = item;
        if (result[date]) {
          result[date] += price;
        } else {
          result[date] = price;
        }
    });
      
    const resultArray = Object.keys(result)?.map(date => ({ date, totalAmountSold: result[date] }));
    

    const [lineChartData, setLineChartData] = useState({
        labels: resultArray?.map((data) => data.date), 
        datasets: [
          {
            label: "Sales in USD",
            data: resultArray?.map((data) => data.totalAmountSold),
            borderColor: "black",
            borderWidth: 3,
            tension: 0.4,
            pointBorderColor: "aqua"
          }
        ]
      });


      //Bar Chart Info //
      const bookSales = {};
      orders?.forEach((order) => {
        order.details.forEach((detail) => {
          const bookId = detail.book.id;
          const bookTitle = detail.book.title;
          const quantitySold = detail.quantity;
      
          if (!bookSales[bookId]) {
            bookSales[bookId] = {
              title: bookTitle,
              totalUnitsSold: quantitySold,
            };
          } else {
            bookSales[bookId].totalUnitsSold += quantitySold;
          }
        });
      });
      
      const bookSalesArray = Object.values(bookSales);
      

      const [barChartData, setBarChartData] = useState({
        labels: bookSalesArray?.map((data) => data.title), 
        datasets: [
          {
            label: "Units sold",
            data: bookSalesArray?.map((data) => data.totalUnitsSold),
            borderColor: "black",
            borderWidth: 2,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
          }
        ]
      });

    return (
        <div className="w-screen h-screen">
            <div className="flex flex-row justify-center py-12">
                <div className="bg-white w-3/12 transition duration-1500 ease-out hover:scale-110">
                <h1 className="text-center font-bold text-5xl ">{users?.length}</h1>
                <h1 className="text-center text-xl">Registered Users</h1>
                </div>
                <div className="bg-white w-3/12 transition duration-1500 ease-out hover:scale-110">
                <h1 className="text-center font-bold text-5xl">
                    {orders?.reduce(
                    (acum, actual) =>
                        acum +
                        actual.details.reduce(
                        (acum2, actual2) => acum2 + actual2.quantity,
                        0
                        ),
                    0
                    )}
                </h1>
                <h1 className="text-center text-xl">Books Sold this Month</h1>
                </div>
                <div className="bg-white w-3/12 transition duration-1500 ease-out hover:scale-110">
                <h1 className="text-center font-bold text-5xl">
                    $
                    {orders?.reduce(
                    (acum, actual) => acum + Number(actual.totalPrice),
                    0
                    ).toFixed(2)}
                </h1>
                <h1 className="text-center text-xl">Sales this Month</h1>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 m-4">
              <div className="transition duration-1500 ease-out hover:scale-105">
                <LineChart lineChartData={lineChartData}/>
              </div>
              <div className="transition duration-1500 ease-out hover:scale-105">
                <BarChart barChartData={barChartData}/>
              </div>
            </div>
        </div>
    )
}
export default Dashboard;