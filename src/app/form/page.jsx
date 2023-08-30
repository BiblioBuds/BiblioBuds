import NewBookInputs from "@/components/NewBookInputs/NewBookInputs";

const Form = () => {
  return (
    <div className="h-full w-screen grid grid-cols-1 mb-14">
      <div className="mt-14 w-[95%] bg-neutral-100 place-self-center rounded-xl border-gray-400 border-[1px]">
        <NewBookInputs />
      </div>
    </div>
  );
};
export default Form;
