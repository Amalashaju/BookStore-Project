import React from 'react'
import { Link } from 'react-router-dom'

function PagenotFound() {
  return (
    <>
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='md:grid grid-cols-3'>
          <div></div>
          <div className='flex justify-center items-center flex-col p-5 md:p-0'>
            <img src="https://cdn.dribbble.com/userupload/24278108/file/original-78d5a175341b5698c5e82e902ff801a6.gif" alt="page not found" />
            <p>Oh No !</p>
            <h1 className='md:text-5xl text-2xl'>Look Like You're Lost</h1>
            <h5>The page you are looking for is not available</h5>
            <Link to={'/'}><button className='mt-4 px-4 py-3 bg-blue-800 text-white rounded hover:border hover:border-blue-800 hover:bg-white hover:text-blue-800'>Back Home</button></Link>
          </div>
          <div></div>
        </div>

      </div>
    </>
  )
}

export default PagenotFound
