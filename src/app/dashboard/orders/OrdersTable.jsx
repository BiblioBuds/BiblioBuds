"use client"
import axios from "axios";
import { useState } from "react";

const OrdersTable = ({orders}) => {

    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleDetails = (index) => {
      if (expandedIndex === index) {
        setExpandedIndex(null);
      } else {
        setExpandedIndex(index);
      }
    };
    
    return (
        <div className="overflow-x-auto w-screen min-h-screen">
        <h1 className="text-center font-bold text-wine text-2xl m-2">
          All Orders
        </h1>
        <div className="container mx-auto p-4">
        <table className="min-w-full rounded-lg overflow-hidden">
        <thead className="text-xs text-black uppercase">
            <tr>
              <th className="py-3 px-6 border-b">Order #</th>
              <th className="py-3 px-6 border-b">Date</th>
              <th className="py-3 px-6 border-b">Status</th>
              <th className="py-3 px-6 border-b">Price</th>
              <th className="py-3 px-6 border-b">Client</th>
              <th className="py-3 px-6 border-b hidden lg:table-cell">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((item, index) => (
              <>
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-wine" : "bg-dark-wine"
                  } text-black`}
                >
                  <td
                    className={`${
                      expandedIndex !== index ? "border-b" : " "
                    } py-3 px-2 text-center`}
                  >
                    {item?.id}
                  </td>
                  <td
                    className={`${
                      expandedIndex !== index ? "border-b" : " "
                    } py-3 px-2 text-center`}
                  >
                    {item?.date.slice(0,10)}
                  </td>
                  <td
                    className={`${
                      expandedIndex !== index ? "border-b" : " "
                    } py-3 px-2 text-center`}
                  >
                    {item?.status}
                  </td>
                  <td
                    className={`${
                      expandedIndex !== index ? "border-b" : " "
                    } py-3 px-2 text-center`}
                  >
                    ${item?.totalPrice}
                  </td>
                  <td
                    className={`${
                      expandedIndex !== index ? "border-b" : " "
                    } py-3 px-2 text-center`}
                  >
                    {item?.user?.email}
                  </td>
                  <td
                    className={`${
                      expandedIndex !== index ? "border-b" : " "
                    } py-3 px-2 text-center`}
                  >
                    <button
                      className="text-sm border rounded text-white hover:text-black border-b-4 bg-blue-500 hover:bg-blue-400 border-blue-700 w-fit duration-300 font-bold mt-2 p-1 justify-center items-center"
                      onClick={() => toggleDetails(index)}
                    >
                      {expandedIndex === index ? "Hide Detail" : "Show Detail"}
                    </button>
                  </td>
                  {/* <td className="py-3 px-2 border-b hidden lg:table-cell space-y-2">
                  {item?.Details?.map((element, innerIndex) => (
                    <div
                      key={innerIndex}
                      className="flex items-center space-x-2"
                    >
                      <img
                        src={element?.Product?.image}
                        alt={element?.Product?.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h2>{element?.Product?.name}</h2>
                        <p>Amount: {element?.quantity}</p>
                        <p>Total: ${element?.unitPrice * element?.quantity}</p>
                      </div>
                    </div>
                  ))}
                </td> */}
                </tr>
                {expandedIndex === index && (
                  <tr
                    className={`${
                      index % 2 === 0 ? "bg-wine" : "bg-dark-wine"
                    }`}
                  >
                    <td colSpan="6" className="py-4 px-4 text-black border-b" >
                      {item.details.map((element, innerIndex) => (
                        <div
                          key={innerIndex}
                          className="flex items-center space-x-2"
                        >
                          <h1 className="mr-4">{innerIndex+1}</h1>
                          <img
                            src={element?.book?.image}
                            alt={element?.book?.name}
                            className="w-16 h-24 object-cover rounded-lg mb-2"
                          />
                          <div>
                            <h2>{element?.book?.title}</h2>
                            <p>Amount: {element?.quantity}</p>
                            <p>
                              Total: ${element?.unitPrice * element?.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    );
}
export default OrdersTable;