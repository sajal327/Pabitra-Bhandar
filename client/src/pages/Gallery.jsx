import React from "react";

import gallery1 from "../assets/g1.jpg";
import gallery2 from "../assets/g2.jpg";
import gallery3 from "../assets/g3.jpg";
import gallery4 from "../assets/g4.jpg";
import gallery5 from "../assets/g5.jpg";
import gallery6 from "../assets/g6.jpg";
import gallery7 from "../assets/g7.jpg";
import gallery8 from "../assets/g8.jpg";
import gallery9 from "../assets/g9.jpg";
import gallery10 from "../assets/g10.jpg";

// Predefined list of image URLs
const imageList = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
  gallery9,
  gallery10,
];

const Gallery = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Gallery</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {imageList.map((url, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          >
            <img
              src={url}
              alt={`gallery-${index}`}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

// import React, { useState } from "react";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const GalleryUpload = () => {
//   const [image, setImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState("");

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     if (file) {
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleUpload = async () => {
//     if (!image) return toast.error("Please select an image");

//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const token = localStorage.getItem("accessToken");
//       const res = await fetch(SummaryApi.uploadImage.url, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       const data = await res.json();
//       if (data.success) {
//         toast.success("Image uploaded successfully");
//         setImage(null);
//         setPreviewUrl("");
//       } else {
//         toast.error(data.message || "Failed to upload image");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Upload error");
//     }
//   };

//   return (
//     <div className="bg-white p-5 rounded shadow max-w-md mx-auto mt-5">
//       <h2 className="text-xl font-semibold mb-3">Upload Store Image</h2>

//       {previewUrl && (
//         <img
//           src={previewUrl}
//           alt="Preview"
//           className="w-full h-60 object-cover rounded mb-3"
//         />
//       )}

//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//         className="mb-3"
//       />

//       <button
//         onClick={handleUpload}
//         className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//       >
//         Upload
//       </button>
//     </div>
//   );
// };

// export default GalleryUpload;

// import React, { useCallback, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useDropzone } from "react-dropzone";
// import axios from "../utils/Axios"; // custom Axios with baseURL
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const Gallery = () => {
//   const [images, setImages] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const token = useSelector((state) => state.auth.accessToken);
//   const user = useSelector((state) => state.auth.user);

//   const isAdmin = user?.role === "ADMIN";

//   // Fetch existing gallery images
//   const fetchImages = async () => {
//     try {
//       const res = await axios.get(SummaryApi.getGalleryImages.url);
//       if (res.data.success) {
//         setImages(res.data.data); // assuming array of image URLs or objects
//       }
//     } catch (err) {
//       console.error("Failed to fetch gallery images", err);
//     }
//   };

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   // Dropzone handler
//   const onDrop = useCallback(
//     async (acceptedFiles) => {
//       if (!isAdmin) return toast.error("Only admins can upload images");

//       const file = acceptedFiles[0];
//       const formData = new FormData();
//       formData.append("image", file);

//       try {
//         setUploading(true);

//         const res = await axios.post(SummaryApi.uploadImage.url, formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         if (res.data.success) {
//           toast.success("Image uploaded successfully");
//           setImages((prev) => [res.data.data.secure_url, ...prev]);
//         } else {
//           toast.error("Upload failed");
//         }
//       } catch (error) {
//         toast.error("Upload error");
//         console.error("Upload error:", error);
//       } finally {
//         setUploading(false);
//       }
//     },
//     [token, isAdmin]
//   );

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-2xl text-center font-bold mb-4">Recent Gallery</h1>

//       {isAdmin && (
//         <div
//           {...getRootProps()}
//           className={`border-dashed border-2 p-6 rounded text-center cursor-pointer mb-6 ${
//             isDragActive ? "bg-gray-200" : "bg-gray-100"
//           }`}
//         >
//           <input {...getInputProps()} />
//           <p>
//             {uploading
//               ? "Uploading..."
//               : "Drag & drop or click to upload image"}
//           </p>
//         </div>
//       )}

//       {images.length === 0 ? (
//         <p className="text-gray-500">No images uploaded yet.</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {images.map((img, index) => (
//             <div key={index} className="rounded overflow-hidden border">
//               <img
//                 src={typeof img === "string" ? img : img.secure_url}
//                 alt={`gallery-${index}`}
//                 className="w-full h-48 object-cover"
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Gallery;
