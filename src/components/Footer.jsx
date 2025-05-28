import React from 'react'
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";



function Footer() {
  return (
    <>
  


    <footer >
     <div className='grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr]  px-5 py-10 bg-gray-900 text-white'>
        <div className='p-3'>
        
        <h1 className='text-2xl '>ABOUT US</h1>
        <p className='mt-4 text-justify'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolorem veniam deserunt quisquam eius ad hic maxime dicta ipsum nemo itaque necessitatibus quas nobis, illum voluptate, pariatur recusandae alias harum!</p>

        </div>
  
       <div className='flex justify-start md:justify-center'>
          <div className='p-3'>
            <h1 className='text-2xl'>NEWSLETTER</h1>
            <p className='mt-4 text-justify'>Stay updated with our latest trends</p>
          <div className="flex mt-3">
          <input type="email" placeholder="Enter email"
                 className="px-3 py-2 w-full bg-amber-50 placeholder-gray-500 rounded-l-md focus:outline-none text-black" />
          <button className="bg-yellow-400 px-4 py-2 rounded-r-md hover:bg-yellow-500">
          <FontAwesomeIcon icon={faArrowRight} className='text-black' />
          </button>
        </div>
          
          </div>
       </div>
  
       
  
        <div className='p-3'>
        <h4 className='text-2xl'>FOLLOW US</h4>
        <p className='mt-4 text-justify'>Let Us be social</p>
  
          <div className='flex gap-5 mt-3  text-3xl'>
          <FontAwesomeIcon icon={faInstagram} className="" />
                      <FontAwesomeIcon icon={faTwitter} />
                      <FontAwesomeIcon icon={faFacebook} />
                      <FontAwesomeIcon icon={faLinkedin} />
  
          </div>
        </div>
  
     </div>
      <div className="bg-black text-white text-center py-3 text-sm">
    <span>Copyright © 2023 All rights reserved | This website is made with <span className="text-yellow-400 text-2xl">♥</span> by <span className="font-semibold">Amala Shaju</span></span>
  </div>

    </footer>
    </>
  )
}

export default Footer