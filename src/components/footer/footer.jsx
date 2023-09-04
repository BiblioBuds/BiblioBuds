import style from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  // TODO: Validar los campos y crear el endpoint
  return (
    <div className="flex flex-grow w-full justify-center bg-[#87C6E9] text-white p-6 mt-8">
      <div className="flex flex-col md:flex-row w-full xl:w-3/4 2xl:w-1/2 space-y-4">
        <form className="flex flex-col w-full xl:w-3/4 px-10">
          <p className="text-lg font-bold mb-2">CONTACT US</p>
          <p className="text-sm mb-4">
            We're here to assist you with any questions or concerns you may
            have. Whether you need help finding the perfect book, have inquiries
            about your order, or just want to share your feedback, our team is
            ready to assist you.
          </p>
          {/* <div className="flex mb-4 space-x-2 xl:space-x-4 2xl:space-x-8">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-3 py-2 border rounded text-sm"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-3 py-2 border rounded text-sm"
            />
          </div> */}
          <div className="flex mb-4 space-x-2 xl:space-x-4 2xl:space-x-8">
            <input
              type="text"
              placeholder="Phone"
              className="w-full px-3 py-2 border rounded text-sm text-gray-500"
            />
            <input
              type="text"
              placeholder="Email"
              className="w-full px-3 py-2 border rounded text-sm text-gray-500"
            />
          </div>
          <textarea
            placeholder="Message..."
            rows={4}
            className="w-full px-3 py-2 border rounded text-sm mb-4 text-gray-500"
          />
          <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-700 duration-300 text-white rounded">
            Submit
          </button>
        </form>
        <section className="flex flex-col w-full xl:w-1/2 2xl:w-1/4 space-y-4 pl-10 text-white">
          <p className="text-lg font-bold mb-2">CONTACT INFORMATION</p>
          <div className="mb-4">
            <p className="text-sm">77 Fake Street</p>
            <p className="text-sm">Buenos Aires. 5001</p>
            <p className="text-sm">Argentina</p>
          </div>
          <div>
            <p className="text-sm">Call Us!</p>
            <p className="text-sm">+54 351 7074422</p>
          </div>
          <div>
            <p className="text-sm">Email Us!</p>
            <p className="text-sm">Bibliobuds@gmail.com</p>
          </div>
          <p className="text-lg font-bold">FOLLOW US</p>
          <div className="space-x-2">
            <Link href="https://www.instagram.com" className="text-sm">
              Instagram
            </Link>
            <Link href="https://www.twitter.com" className="text-sm">
              Twitter
            </Link>
            <Link href="https://www.facebook.com" className="text-sm">
              Facebook
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Footer;
