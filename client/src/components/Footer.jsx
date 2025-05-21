import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";

// const Example = () => {
//   return (
//     <div>
//       <h1>
//         Welcome to our site! <FontAwesomeIcon icon={["fas", "home"]} />
//       </h1>
//       <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//         <FontAwesomeIcon
//           icon={["fab", "facebook"]}
//           className="text-blue-600 text-2xl"
//         />
//       </a>
//     </div>
//   );
// };

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white md:mt-8 mt-4 py-10 px-4">
      <div className="container mx-auto grid gap-8 md:grid-cols-3">
        {/* Left - Company Info */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold mb-3">
            Pabitra Bhandar Mini Mart
          </h2>
          <p className="text-sm">
            Your one-stop grocery destination for fresh and quality products
            delivered to your doorstep.
          </p>

          <p className="mt-4 text-sm font-normal flex items-center justify-center md:justify-start gap-1">
            <FaRegCopyright />
            All Rights Reserved {year}.
          </p>
        </div>

        {/* Center - Google Maps Embed */}
        <div className="w-full">
          <h3 className="text-lg font-medium mb-2 text-center">
            Find Us on Map
          </h3>
          <div className="rounded-lg overflow-hidden shadow-lg w-full h-[200px]">
            <iframe
              title="Google Map"
              className="w-full h-full border-none"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.273325692701!2d87.30763939678953!3d23.558625000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f76e1069da0483%3A0x33d115f351f4c8a1!2sPabitra%20Bhandaar!5e0!3m2!1sen!2sin!4v1744800293493!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Right - Social Links */}
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Connect with Us</h3>
          <div className="flex justify-center md:mt-5 md:justify-center gap-6 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-500 transition-colors duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/919679159502"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition-colors duration-300"
            >
              <FaWhatsapp />
            </a>
          </div>
          <p className="text-base font-light mt-7 flex items-center justify-center">
            <IoMdCall />
            Call us:
            <a href="tel:+919679159502" className=" ml-1 hover:text-yellow-400">
              9679159502
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import React from 'react'
// import { FaFacebook } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className='border-t'>
//         <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
//             <p>© All Rights Reserved 2024.</p>

//             <div className='flex items-center gap-4 justify-center text-2xl'>
//                 <a href='' className='hover:text-primary-100'>
//                     <FaFacebook/>
//                 </a>
//                 <a href='' className='hover:text-primary-100'>
//                     <FaInstagram/>
//                 </a>
//                 <a href='' className='hover:text-primary-100'>
//                     <FaLinkedin/>
//                 </a>
//             </div>
//         </div>
//     </footer>
//   )
// }

// export default Footer
