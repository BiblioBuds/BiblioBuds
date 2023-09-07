"use client"
import axios from "axios";

const UsersTable = ({users}) => {
    
    const handleDeactivate = async (id) => {
        try {
          await axios.put(`/api/users/${id}`, {
              isActive: "false"
            }
          );
          location.reload()
        } catch (error) {
          console.log(error);
        }
    };
    
    const handleActivate = async (id) => {
        try {
          await axios.put(`/api/users/${id}`, {
              isActive: "true"
            }
          );
          location.reload()
        } catch (error) {
          console.log(error);
        }
    };

    const makeAdmin = async (id) => {
      try {
        await axios.put(`/api/users/${id}`, {
            role: "ADMIN"
          }
        );
        location.reload()
      } catch (error) {
        console.log(error);
      }
    };

    const quitAdmin = async (id) => {
      try {
        await axios.put(`/api/users/${id}`, {
            role: "GUEST"
          }
        );
        location.reload()
      } catch (error) {
        console.log(error);
      }
    };
    
    return (
        <div className="overflow-x-auto w-screen min-h-screen">
        <h1 className="text-center font-bold text-wine text-2xl m-2">
          All Users
        </h1>
        <div className="container mx-auto p-4">
          <table className="min-w-full rounded-lg overflow-hidden">
            <thead className="text-xs text-black uppercase bg-dark-wine">
              <tr>
                <th className="py-3 px-6 border-b">Id</th>
                <th className="py-3 px-6 border-b">Email</th>
                <th className="py-3 px-6 border-b">Name</th>
                <th className="py-3 px-6 border-b">Role</th>
                <th className="py-3 px-6 border-b">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users
                ?.sort((a, b) => a.id - b.id)
                .map((user, key) => {
                  return (
                    <tr
                      key={key}
                    >
                      <td className="py-3 px-2 text-center">{user.id}</td>
                      <td className="py-3 px-2 text-center">{user.email}</td>
                      <td className="py-3 px-2 text-center">{user.name}</td>
                      <td className="py-3 px-2 text-center">{user.role}</td>
                      <td className="flex flex-row py-3 px-2 text-center">
                        {user.isActive === "true" ? (
                          <div className="flex mx-auto justify-center my-1">
                            <button
                              className="text-sm border rounded text-white hover:text-black border-b-4 bg-red-500 hover:bg-red-400 border-red-700 w-fit duration-300 font-bold mt-2 p-1 justify-center items-center"
                              onClick={() => handleDeactivate(user.id)}
                            >
                              Deactivate
                            </button>
                          </div>
                        ) : (
                          <div className="flex mx-auto justify-center my-1">
                            <button
                              className="text-sm border rounded text-white hover:text-black border-b-4 bg-green-500 hover:bg-green-400 border-green-700 w-fit duration-300 font-bold mt-2 p-1 justify-center items-center"
                              onClick={() => handleActivate(user.id)}
                            >
                              Activate
                            </button>
                          </div>
                        )}
                        {user.role === "GUEST" ? (
                          <div className="flex mx-auto justify-center my-1">
                            <button
                              className="text-sm border rounded text-white hover:text-black border-b-4  bg-green-500 hover:bg-green-400 border-green-700 w-fit duration-300 font-bold mt-2 p-1 justify-center items-center"
                              onClick={() => makeAdmin(user.id)}
                            >
                              Make Admin
                            </button>
                          </div>
                        ) : (
                          <div className="flex mx-auto justify-center my-1">
                            <button
                              className="text-sm border rounded text-white hover:text-black border-b-4 bg-red-500 hover:bg-red-400 border-red-700 w-fit duration-300 font-bold mt-2 p-1 justify-center items-center"
                              onClick={() => quitAdmin(user.id)}
                            >
                              Quit Admin
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
}
export default UsersTable;