import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductsCard({ item }) {

  const oldProduct = {
    id: item.id,
    price: parseFloat(item.price),
    stock: item.stock,
  };
  const [updatedProduct, setUpdatedProduct] = useState({
    id: item.id,
    price: parseFloat(item.price),
    stock: item.stock,
  });

  const handleDeactivate = async (id) => {
    try {
      await axios.put(`/api/books/${id}`, {
          isActive: "false"
        }
      );
      toast.success("Book Deactivated.");
      location.reload()
    } catch (error) {
      console.log(error);
    }
};

const handleActivate = async (id) => {
    try {
      await axios.put(`/api/books/${id}`, {
          isActive: "true"
        }
      );
      toast.success("Book Activated.");
      location.reload()
    } catch (error) {
      console.log(error);
    }
};

const [allowUpdate, setAllowUpdate] = useState(false);


  const handleChange = (e) => {
    const { value, name } = e.target;
    let newValue;
    if (name === "price") {
        newValue = (value);
    } else if (name === "stock") {
        newValue = (value);
    } else {
        newValue = value;
    }
    setUpdatedProduct({ ...updatedProduct, [name]: newValue });
  };

  const handleCancel = () => {
    setAllowUpdate(!allowUpdate);
    setUpdatedProduct(oldProduct);
  };

  const handleSave = async () => {
    setAllowUpdate(!allowUpdate);
    try {
      await axios.put(`/api/book/${item.id}`, updatedProduct,
      {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Book Updated.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr key={item.id}>
        <td className="py-3 px-2 text-center">{item.id}</td>
        <td className="py-3 px-2 text-center">{item.title}</td>
        <td className="py-3 px-2 text-center">{item.author}</td>
        <td className="py-3 px-2 text-center">$
        <input
            name="price"
            className="border-2 border-blue-300 p-1 rounded w-20 placeholder:text-gray-700 text-center ml-2"
            disabled={!allowUpdate}
            value={updatedProduct.price}
            onChange={handleChange}
            type="number"
            step="0.01"
        />
        </td>
        <td className="py-3 px-2 text-center">
        <input
            name="stock"
            className="border-2 border-blue-300 p-1 rounded w-20 placeholder:text-gray-700 text-center ml-2"
            disabled={!allowUpdate}
            value={updatedProduct.stock}
            onChange={handleChange}
            min={0}
            type="number"
            step="1"
        />
        </td>
        <td className="py-3 px-2 text-center">
        {item.isActive === "true" ? (
            <div className="flex mx-auto justify-center my-1">
            <button
                className="text-sm border rounded text-white hover:text-black border-b-4 bg-red-500 hover:bg-red-400 border-red-700 w-fit duration-300 font-bold mt-2 p-1 justify-center items-center"
                onClick={() => handleDeactivate(item.id)}
            >
                Deactivate
            </button>
            </div>
        ) : (
            <div className="flex mx-auto justify-center my-1">
            <button
                className="text-sm border rounded text-white hover:text-black border-b-4 bg-green-500 hover:bg-green-400 border-green-700 w-fit duration-300 font-bold mt-2 p-1 justify-center items-center"
                onClick={() => handleActivate(item.id)}
            >
                Activate
            </button>
            </div>
        )}
        {allowUpdate ? (
            <div className="flex mx-auto justify-center my-1">
            <button
                className="text-sm border rounded text-white hover:text-black border-b-4 bg-green-500 hover:bg-green-400 border-green-700 w-fit duration-300 font-bold mt-2 p-1 justify-center items-center mx-2"
                onClick={handleSave}
            >
                Save
            </button>
            <button
                className="text-sm border rounded text-white hover:text-black border-b-4 bg-red-500 hover:bg-red-400 border-red-700 w-fit duration-300 font-bold mt-2 p-1 justify-center items-center mx-2"
                onClick={handleCancel}
            >
                Cancel
            </button>
            </div>
        ) : (
            <div className="flex mx-auto justify-center my-1">
            <button
                className="bg-blue-500 hover:bg-blue-400  border-blue-700 text-sm border rounded text-white hover:text-black border-b-4  w-12 duration-300 font-bold mt-2 p-1 justify-center items-center"
                onClick={() => setAllowUpdate(!allowUpdate)}
            >
                Edit
            </button>
            </div>
        )}    
        </td>
    </tr>
  );
}

export default ProductsCard;
