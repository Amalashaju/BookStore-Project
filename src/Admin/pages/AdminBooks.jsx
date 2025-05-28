import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { approveBookApi, getAllBookAdminApi, getAllUsersApi } from '../../services/allApi'
import { toast, ToastContainer } from 'react-toastify'

function AdminBooks() {
  const [bookliststatus, setbookliststatus] = useState(true)
  const [usersstatus, setusersstatus] = useState(false)
  const [bookdetails, setBookDetails] = useState([])
  const [token, setToken] = useState("")
  const [approveStatus, setApproveStatus] = useState(false)
  const [allusers, setallUsers] = useState([])


  const getAllBookAdmin = async (token) => {

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllBookAdminApi(reqHeader)
    // console.log(result);
    if (result.status == 200) {
      setBookDetails(result.data)

    }

  }

  const approveBook = async (data) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await approveBookApi(data, reqHeader)
    console.log(result);
    if (result.status == 200) {
      setApproveStatus(!approveStatus)
    }
    else {
      toast.error('somethoing went wrong')
    }

  }

  //function to get all users 
  const getAllUsers = async (token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllUsersApi(reqHeader)
    console.log(result);
    if (result.status == 200) {
      setallUsers(result.data)
    }
  }


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem('token')
      setToken(token)
      if (bookliststatus == true) {
        getAllBookAdmin(token)

      }
      else if (usersstatus == true) {
        getAllUsers(token)
      }
      else {
        console.log('something went wrong');

      }

    }

  }, [approveStatus, usersstatus])
  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-[1fr_4fr]'>
        <div className='bg-blue-100 flex flex-col items-center p-5'>
          <AdminSidebar />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-center my-5'>All Books</h1>
          {/* tab */}
          <div className='flex justify-center items-center my-5'>
            <p onClick={() => { setbookliststatus(true), setusersstatus(false) }} className={bookliststatus ? 'p-4 text-blue-600 rounded border-t border-r border-gray-200 cursor-pointer' : 'p-4 text-black rounded border-t border-r border-gray-200 cursor-pointer'}>Book List</p>
            <p onClick={() => { setbookliststatus(false), setusersstatus(true) }} className={usersstatus ? 'p-4 text-blue-600 rounded border-b border-l border-gray-200 cursor-pointer' : 'p-4 text-black rounded border-b border-l border-gray-200 cursor-pointer'}>Users</p>
          </div>
          {bookliststatus &&
            <div className='md:grid grid-cols-4 gap-5 md:mx-20 mx-5 mb-5'>
              {
                bookdetails?.length > 0 ?
                  bookdetails?.map((item, index) => (
                    <div className={item.status == 'sold' ? 'p-3 m-5  md:m-0 shadow-lg opacity-58' : 'p-3 m-5  md:m-0 shadow-lg'} key={index}>
                      <img src={item?.imageurl} alt="book image" style={{ width: '100%', height: "150px" }} />
                      <div className='flex justify-center items-center flex-col'>
                        <p className='text-blue-700 text-sm'>{item?.author.slice(0, 20)}...</p>
                        <h3>{item?.title.slice(0,20)}...</h3>
                        <p className='text-xs text-red-700 mb-1'></p>
                        {item?.status == 'pending' &&
                          <button className='bg-green-600 text-white w-full hover:border hover:border-green-600 hover:bg-white hover:text-green-700' onClick={() => approveBook(item)}>Approve</button>}

                        {item?.status == 'approved' &&
                          <div className='flex justify-end w-full'><img src="https://static.vecteezy.com/system/resources/thumbnails/019/465/852/small_2x/tick-mark-icon-symbol-on-transparent-background-free-png.png" alt="" style={{ width: '40px', height: '40px' }} /></div>}
                      </div>
                    </div>)) :
                  <p>No books</p>
              }
            </div>
          }

          {usersstatus &&
            <div className='md:grid grid-cols-3 gap-5 mx-10'>
              {
                allusers?.length > 0 ?
                  allusers?.map((user) => (
                    <div className='bg-gray-300 rounded p-3 mb-5'>
                      <p className='text-red-600 mb-2'>ID:{user?._id}</p>
                      <div className='flex gap-5'>
                        <div>
                          <img src={user?.profile == "" ? "https://cdn-icons-png.freepik.com/512/8742/8742495.png" : `${user?.profile}`} alt="no image" style={{ height: "50px" ,borderRadius:'50%'}} />
                        </div>
                        <div className='ms-3'>
                          <h3 className='text-blue-600 text-xl'>{user?.username}</h3>
                          <p>{user?.email}</p>
                        </div>
                      </div>
                    </div>
                  )) :
                  <p>no users</p>
              }




            </div>}

        </div>


      </div>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
      <Footer />
    </>
  )
}

export default AdminBooks