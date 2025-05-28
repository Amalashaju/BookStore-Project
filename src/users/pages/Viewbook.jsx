import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { faBackward } from '@fortawesome/free-solid-svg-icons/faBackward'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faXmark } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../components/Footer'

import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera'
import { makePaymentApi, viewABookApi } from '../../services/allApi'
import { Link, useParams } from 'react-router-dom'
import { serverUrl } from '../../services/serverUrl'
import { loadStripe } from '@stripe/stripe-js';
import { toast, ToastContainer } from 'react-toastify'

function Viewbook() {

  const [bookphoto, setBookPhoto] = useState(false)
  const [viewBoookDetails, setViewBokkDetails] = useState({})
  const [token, setToken] = useState("")

  const { id } = useParams()
  // console.log(id);


  const ViewABook = async (id) => {
    const result = await viewABookApi(id)
    // console.log(result);
    if (result.status == 200) {
      setViewBokkDetails(result.data)

    }

  }
  console.log(viewBoookDetails);


  //function to make payment
  const makePayment = async () => {
    console.log(viewBoookDetails);
    const stripe = await loadStripe('pk_test_51RSxzGGa0IMqvz7QEMy9ivgcgqvM3wI2r6owpoICnS0ZbPYjJIKu4PgaCee5Iu9kcKCuIWLUa3kPsP86Lby3u8mV00amkJ8yKR');
    //data to update in backend
    const reqBody = {
      booksDetails: viewBoookDetails
    }
    const reqHeader = {
      "Authorization": `Bearer ${token}`

    }
    const result = await makePaymentApi(reqBody, reqHeader)
    console.log(result);
    // console.log(result.data.existingBook);


    const sessionId = result.data.sessionId

    const response = stripe.redirectToCheckout({
      sessionId: sessionId
    })
    if (response.error) {
      toast.error('something went wrong')
    }

  }

  useEffect(() => {
    ViewABook(id)
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)
    }
  }, [])


  return (
    <>
      <Header />
      <div className='md:p-20 p-5'>
        <div className='md:p-10 p-5 shadow w-full'>
          <div className='flex justify-end mb-5 md:mb-0'>
            <FontAwesomeIcon icon={faEye} className='text-gray-500' onClick={() => setBookPhoto(true)} />
          </div>
          <div className='md:grid grid-cols-[1fr_3fr] w-full overflow-x-hidden'>

            <div>
              <img src={viewBoookDetails.imageurl} alt="" style={{ width: '100%', height: '400px' }} />
            </div>

            <div className='px-4 mt-5 md:mt-0'>
              <h1 className='font-medium text-2xl text-center'>{viewBoookDetails?.title}</h1>
              <p className='text-blue-500 text-center'>{viewBoookDetails?.author}</p>


              <div className='md:flex justify-center items-center gap-30 mt-10'>
                <p >Publisher: {viewBoookDetails?.publisher}</p>
                <p className='mt-3 md:mt-0'>Language: {viewBoookDetails.language}</p>
                <p className='mt-3 md:mt-0'>No. of pages: {viewBoookDetails.noofpages}</p>
              </div>

              <div className='md:flex justify-center gap-30 mt-10'>
                <p>Seller Mail:{viewBoookDetails.userMail}</p>
                <p className='mt-3 md:mt-0'>Real Price:{viewBoookDetails.price}</p>
                <p className='mt-3 md:mt-0'>ISBN::{viewBoookDetails.isbn}</p>
              </div>


              <div className='mt-8 md:mt-15 font-bold  text-justify'>{viewBoookDetails.abstarct}</div>

              <div className='flex justify-between md:justify-end gap-5 mt-8 md:mt-35 items-center'>

                <Link to={'/all-books'}>
                  <button className='px-8 md:px-5 py-3 text-white bg-blue-500 rounded'>
                    <FontAwesomeIcon icon={faBackward} className='me-3' />
                    Back</button>
                </Link>

                <button type='button' onClick={makePayment} className=' px-8 md:px-5 py-3 text-white bg-green-600 rounded'>Buy ${viewBoookDetails.dprice}</button>
              </div>


            </div>

          </div>

        </div>

      </div>

      {/* book  */}

      {/* {bookphoto && (
        <div className="fixed top-50 left-0 w-full  flex items-center justify-center ">
          <div className="bg-white w-110 rounded shadow-lg relative">
            <div className="flex justify-between px-4 py-5 bg-gray-900 text-white rounded">
              <h1>Book Photo</h1>
              <button onClick={() => setBookPhoto(false)} className="text-gray-900 bg-white px-3 rounded"></button>
            </div>
            <div className="text-white-500 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <p className="text-blue-500"><FontAwesomeIcon icon={faCamera} className='me-3' />Camera click of the book in the hand of seller</p>
              <div className='md:flex my-4'>
                {
                  viewBoookDetails?.uploadedImages.map((item) => (
                    <img
                      src={`${serverUrl}/upload/${item}`}
                      alt="Book"
                      className="w-full"
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      )} */}

      {bookphoto && (
        <div onClick={() => setBookPhoto(false)} className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                <div className="bg-gray-900 p-3 text-white flex justify-between">
                  <h3>Book Photos</h3>
                  <FontAwesomeIcon icon={faXmark} onClick={() => setBookPhoto(false)} />
                </div>

                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <p className="text-blue-500">
                    <FontAwesomeIcon icon={faCamera} className="me-3" />
                    Camera click of the book in the hand of seller
                  </p>

                  <div className="md:flex my-4">
                    {
                      viewBoookDetails?.uploadedImages.map((item) => (
                        <img src={`${serverUrl}/upload/${item}`} alt="Book" className="mt-4 mx-5" style={{ width: '300px', height: '300px' }} />
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />

      <Footer />

    </>
  )
}

export default Viewbook