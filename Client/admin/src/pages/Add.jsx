// import React, { useState } from 'react'
// import { assets } from '../assets/assets'
// import axios from 'axios'
// import {backendUrl} from '../App'
// import { toast } from 'react-toastify'

// // const Add = ({token}) => {
// const Add = () => {


//   const [image1, setImage1] = useState(false);
//   const [image2, setImage2] = useState(false);
//   const [image3, setImage3] = useState(false);
//   const [image4, setImage4] = useState(false);

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [company, setCompany] = useState("");
//   const [type, setType] = useState("");
//   const [price, setPrice] = useState("");

//   const onSubmitHandler = async (e)=>{
//     e.preventDefault();
//     try {
//       const formData = new FormData()
//       formData.append("name", name)
//       formData.append("company", company)
//       formData.append("description", description)
//       formData.append("type", type)
//       formData.append("price", price)

//       image1 && formData.append("image1", image1)
//       image2 && formData.append("image2", image2)
//       image3 && formData.append("image3", image3)
//       image4 && formData.append("image4", image4)

//       // const response = await axios.post(backendUrl + "/api/v1/products",formData,{headers:{token}})
//       const response = await axios.post(backendUrl + "/api/v1/products",formData)

//       // console.log(response.data);
//       if(response.data.success){
//         toast.success(response.data.message)
//         setName('')
//         setCompany('')
//         setType('')
//         setDescription('')
//         setPrice('')
//         setImage1(false)
//         setImage2(false)
//         setImage3(false)
//         setImage4(false)
//       }
//       else{
//         toast.error(response.data.message)
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
//     }
//   }

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 text-sm font-medium'>
//       <div>
//         <p className='mb-2'>Upload Image</p>
//         <div className='flex gap-2'>
//           <label htmlFor="image1">
//             <img className='w-20 cursor-pointer' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="upload image" />
//             <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
//           </label>
//           <label htmlFor="image2">
//             <img className='w-20 cursor-pointer' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="upload image" />
//             <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
//           </label>
//           <label htmlFor="image3">
//             <img className='w-20 cursor-pointer' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="upload image" />
//             <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
//           </label>
//           <label htmlFor="image4">
//             <img className='w-20 cursor-pointer' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="upload image" />
//             <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
//           </label>
//         </div>
//       </div>
//       <div className='w-full'>
//         <p className='mb-1'>Product Name</p>
//         <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-2 py-1 ' type="text" placeholder='Type here' id="" required />
//       </div>
//       <div className='w-full'>
//         <p className='mb-1'>Product Company</p>
//         <input onChange={(e)=>setCompany(e.target.value)} value={company} className='w-full max-w-[500px] px-2 py-1 ' type="text" placeholder='Type here' id="" required />
//       </div>
//       <div className='w-full'>
//         <p className='mb-1'>Cancer Type</p>
//         <input onChange={(e)=>setType(e.target.value)} value={type} className='w-full max-w-[500px] px-2 py-1 ' type="text" placeholder='Type here' id="" required />
//       </div>
//       <div className='w-full'>
//         <p className='mb-1'>Product Description</p>
//         <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-2 py-1 ' type="text" placeholder='write cntent here' id="" required/>
//       </div>
//       <div className='w-full'>
//         <p className='mb-1'>Product Price</p>
//         <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full max-w-[500px] px-2 py-1 ' type="number" placeholder='Type here' id="" required />
//       </div>
      
//       <button type='submit' className='w-28 font-normal py-2 mt-4 bg-[#004DFF] text-white px-1 sm:px-7 sm:py-2 rounded text-xs sm:text-sm'>ADD</button>

//     </form>
//   )
// }

// export default Add


import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = () => {
  const [images, setImages] = useState([null,null,null,null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState();

  const onImageChange = (e, index) => {
    const files = [...images];
    files[index] = e.target.files[0];
    setImages(files);
    console.log(files,"hello")
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("company", company);
        formData.append("description", description);
        formData.append("type", type);
        formData.append("price", Number(price)); // Convert to number

        images.forEach((image) => {
            if (image) formData.append("images", image);
        });

        console.log("Form Data before submit:", {
            name,
            company,
            description,
            type,
            price: Number(price), // Convert here as well for logging
            images
        });

        const response = await axios.post(`${backendUrl}/api/v1/products`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        if (response.data.status === "success") {
            toast.success(response.data.message);
            setName('');
            setCompany('');
            setType('');
            setDescription('');
            setPrice(''); // reset after submission
            setImages([null, null, null, null]);
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.log(error); // Log the error to see more details
        toast.error(error.message);
    }
};


 

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 text-sm font-medium'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          {images.map((image, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img
                className='w-20 cursor-pointer'
                src={!image ? assets.upload_area : URL.createObjectURL(image)}
                alt="upload"
              />
              <input onChange={(e) => onImageChange(e, index)} type="file" id={`image${index+1}`} hidden />
            </label>
          ))}
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-1'>Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-2 py-1' type="text" placeholder='Type here' required />
      </div>
      <div className='w-full'>
        <p className='mb-1'>Product Company</p>
        <input onChange={(e) => setCompany(e.target.value)} value={company} className='w-full max-w-[500px] px-2 py-1' type="text" placeholder='Type here' required />
      </div>
      <div className='w-full'>
        <p className='mb-1'>Cancer Type</p>
        <input onChange={(e) => setType(e.target.value)} value={type} className='w-full max-w-[500px] px-2 py-1' type="text" placeholder='Type here' required />
      </div>
      <div className='w-full'>
        <p className='mb-1'>Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-2 py-1' placeholder='write content here' required />
      </div>
      <div className='w-full'>
        <p className='mb-1'>Product Price</p>
        <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full max-w-[500px] px-2 py-1' type="number" placeholder='Type here' required />
      </div>
      <button type='submit' className='w-28 font-normal py-2 mt-4 bg-[#004DFF] text-white px-1 sm:px-7 sm:py-2 rounded text-xs sm:text-sm'>ADD</button>
    </form>
  );
};

export default Add;
