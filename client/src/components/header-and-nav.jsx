// import React from "react";
// // import Matrix from './image.png';
// // import Health from './health.png';
// // import Estore from './store.png';
// // import Profile from './user.png';

// export const Header = () => {
//     return (
//         <div>
//             {/* Header */}
//             <div className="fixed top-0 left-0 w-full h-20 border-b border-gray-200 bg-white shadow-lg z-50 flex items-center">
//                 <p className="font-jockey font-normal text-5xl ml-10 text-black">
//                     <span className="text-blue-700">O</span>nco
//                     <span className="text-blue-700">C</span>ura
//                 </p>
//             </div>

//             {/* Vertical Navbar */}
//             <div className="fixed top-36 left-10 w-20 h-[430px] bg-white rounded-2xl border border-gray-200 shadow-lg z-40">
//                 <ul className="flex flex-col items-center p-2 list-none">
//                     <li className="flex flex-col items-center text-center my-6">
//                         <a href="" className="text-black font-bold text-tiny flex flex-col items-center font-poppins">
//                             <img src={'/image.png'} alt="Matrix Icon" className="w-8 h-8 mb-2" />
//                             <span>MATRIX</span>
//                         </a>
//                     </li>
//                     <li className="flex flex-col items-center text-center my-6">
//                         <a href="" className="text-black font-bold text-tiny flex flex-col items-center font-poppins">
//                             <img src={'/health.png'} alt="Health Icon" className="w-8 h-8 mb-2" />
//                             <span>PLAN</span>
//                         </a>
//                     </li>
//                     <li className="flex flex-col items-center text-center my-6">
//                         <a href="" className="text-black font-bold text-tiny flex flex-col items-center font-poppins">
//                             <img src={'/store.png'} alt="E-Store Icon" className="w-8 h-8 mb-2" />
//                             <span>ESTORE</span>
//                         </a>
//                     </li>
//                     <li className="flex flex-col items-center text-center my-6">
//                         <a href="" className="text-black font-bold text-tiny flex flex-col items-center font-poppins">
//                             <img src={'/user.png'} alt="Profile Icon" className="w-8 h-8 mb-2" />
//                             <span>PROFILE</span>
//                         </a>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// };


import React from "react";
// import Matrix from './image.png';
// import Health from './health.png';
// import Estore from './store.png';
// import Profile from './user.png';

export const Header = () => {
    return (
        <div>
            {/* Header */}
            <div className="fixed top-0 left-0 w-full h-16 sm:h-20 border-b border-gray-200 bg-white shadow-lg z-50 flex items-center">
                <p className="font-jockey font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl ml-4 sm:ml-8 md:ml-10 text-black">
                    <span className="text-blue-700">O</span>nco
                    <span className="text-blue-700">C</span>ura
                </p>
            </div>

            {/* Vertical Navbar */}
            <div className="fixed top-20 left-4 sm:top-36 sm:left-10 w-16 sm:w-20 h-[300px] sm:h-[430px] bg-white rounded-2xl border border-gray-200 shadow-lg z-40">
    <ul className="flex flex-col items-center p-2 list-none">
        <li className="flex flex-col items-center text-center my-4 sm:my-6">
            <a href="" className="text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins">
                <img src={'/image.png'} alt="Matrix Icon" className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2" />
                <span>MATRIX</span>
            </a>
        </li>
        <li className="flex flex-col items-center text-center my-4 sm:my-6">
            <a href="" className="text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins">
                <img src={'/health.png'} alt="Health Icon" className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2" />
                <span>PLAN</span>
            </a>
        </li>
        <li className="flex flex-col items-center text-center my-4 sm:my-6">
            <a href="" className="text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins">
                <img src={'/store.png'} alt="E-Store Icon" className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2" />
                <span>ESTORE</span>
            </a>
        </li>
        <li className="flex flex-col items-center text-center my-4 sm:my-6">
            <a href="" className="text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins">
                <img src={'/user.png'} alt="Profile Icon" className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2" />
                <span>PROFILE</span>
            </a>
        </li>
    </ul>
</div>

        </div>
    );
};
