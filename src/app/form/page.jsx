import NewBookInputs from "@/components/NewBookInputs/NewBookInputs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Form = () => {

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


  return (
    <div>
    {isAdmin === "ADMIN"?
      <div className="h-full w-screen grid grid-cols-1 mb-14">
        <div className="mt-14 w-[95%] bg-neutral-100 place-self-center rounded-xl border-gray-400 border-[1px]">
          <NewBookInputs />
        </div>
      </div>
      : 
      <div>
          <h1>Not Allowed</h1>
      </div>
      }       
    </div>
  );
};
export default Form;
