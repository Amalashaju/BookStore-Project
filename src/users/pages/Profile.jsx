import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EditProfile from '../components/EditProfile'
import { faCircleCheck, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { deleteAUserBookApi, getAllUserBookApi, getAllUserBroughtBookApi, uploadBookApi } from '../../services/allApi'
import { userProfileUpdateStatusContext } from '../../context/Contextshare'
import { serverUrl } from '../../services/serverUrl'



function Profile() {

    const [sellstatus, setsellstatus] = useState(true)
    const [bookstatus, setbookstatus] = useState(false)
    const [purchasestatus, setpurchasestatus] = useState(false)

    const [preview, setpreview] = useState('')

    const [previewList, setpreviewList] = useState([])
    const [token, setToken] = useState([])
    const { userProfileUpdateStatus } = useContext(userProfileUpdateStatusContext)
    const [userbook, setuserBook] = useState([])
    const [userBroughtbook, setuserBroughtBook] = useState([])
    const [deletestatus, setdeleteStatus] = useState("")

    const [userD, setuserD] = useState({
        username: "",
        profile: "",
        bio: ""

    })

    const [bookdetails, setBookDetails] = useState({
        title: "", author: "", noofpages: "", imageurl: "", price: "", dprice: "", abstarct: "", publisher: "", language: "", isbn: "", category: "", uploadedImages: []
    })
    console.log(bookdetails);

    const handleUpload = (e) => {
        console.log(e.target.files[0]);

        const fileArray = bookdetails.uploadedImages
        fileArray.push(e.target.files[0])
        setBookDetails({ ...bookdetails, uploadedImages: fileArray })

        const url = URL.createObjectURL(e.target.files[0])
        console.log(url);

        setpreview(url)
        const newArray = previewList
        newArray.push(url)
        setpreviewList(newArray)

    }

    const handleReset = () => {
        setBookDetails({
            title: "", author: "", noofpages: "", imageurl: "", price: "", dprice: "", abstarct: "", publisher: "", language: "", isbn: "", category: "", uploadedImages: []

        })
        setpreview("")
        setpreviewList([])
    }

    const handleSubmit = async () => {
        const { title, author, noofpages, imageurl, price, dprice, abstarct, publisher, language, isbn, category, uploadedImages } = bookdetails

        if (!title || !author || !noofpages || !imageurl || !price || !dprice || !abstarct || !publisher || !language || !isbn || !category || uploadedImages.length == 0) {
            toast.info('please fill the fields completely')


        }
        else {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }


            const reqBody = new FormData()

            for (let key in bookdetails) {
                if (key != 'uploadedImages') {
                    reqBody.append(key, bookdetails[key])

                }
                else {
                    bookdetails.uploadedImages.forEach((item) => {
                        reqBody.append("uploadedImages", item)
                    })
                }

            }

            const result = await uploadBookApi(reqBody, reqHeader)
            console.log(result);

            if (result.status == 401) {
                toast.info(result.response.data)
            }

            else if (result.status == 200) {
                toast.success('Book added successfully')
                handleReset()
            }

            else {
                toast.error('Something went wrong')
            }
        }


    }

    const getallUserBook = async () => {
        console.log('getallUserBook');

        const reqHeader = {
            "Authorization": `Bearer ${token}`

        }
        const result = await getAllUserBookApi(reqHeader)
        console.log(result);
        if (result.status == 200) {
            setuserBook(result.data)
        }
    }


    const getallUserBroughtBook = async () => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`

        }
        const result = await getAllUserBroughtBookApi(reqHeader)
        console.log(result);
        if (result.status == 200) {
            setuserBroughtBook(result.data)
        }
    }

    const deleteBook = async (id) => {
        console.log('deleteBook');

        const result = await deleteAUserBookApi(id)
        console.log(result);
        setdeleteStatus(result.data)

    }



    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setuserD({ username: user.username, profile: user.profile, bio: user.bio })
        }
    }, [userProfileUpdateStatus])

    useEffect(() => {
        if (bookstatus == true) {
            getallUserBook()
        }
        else if (purchasestatus == true) {
            getallUserBroughtBook()
        }
        else {
            console.log('something went wrong');
        }
    }, [bookstatus, deletestatus])
    return (
        <>
            <Header />
            <div style={{ height: '200px' }} className='bg-gray-900'></div>

            <div style={{ width: '230px', height: '230px', borderRadius: '50%', marginLeft: '70px', marginTop: '-130px' }} className='bg-white p-3'>
                <img src={userD.profile == "" ? "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" : `${serverUrl}/upload/${userD.profile}`} alt="" style={{ width: '230px', height: '230px', borderRadius: '50%' }} />

            </div>
            <div className="md:flex justify-between px-20 mt-5">
                <p className='flex justify-center items-center'>
                    <span className='md:text-3xl text-2xl'>{userD.username}</span><FontAwesomeIcon icon={faCircleCheck} className='text-blue-400 ms-3' />
                </p>
                <EditProfile />
            </div>
            <p className='md:px-20 px-5 my-5 text-justify'>{userD.bio}</p>

            <div className='md:px-40'>
                {/* tab */}

                <div className='flex justify-center items-center my-5'>
                    <p onClick={() => { setsellstatus(true); setbookstatus(false); setpurchasestatus(false) }} className={sellstatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>Sell Book</p>

                    <p onClick={() => { setsellstatus(false); setbookstatus(true); setpurchasestatus(false) }} className={bookstatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>Book Status</p>

                    <p onClick={() => { setsellstatus(false); setbookstatus(false); setpurchasestatus(true) }} className={purchasestatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>Purchase History</p>
                </div>


                {/* content */}

                {sellstatus && <div className='bg-gray-200 p-10 my-20'>

                    <h1 className='text-center text-3xl font-medium'>Book Details</h1>

                    <div className='md:grid grid-cols-2 mt-10 w-full'>

                        <div className='px-3'>
                            <div className="mb-3">
                                <input type="text" value={bookdetails.title} onChange={(e) => setBookDetails({ ...bookdetails, title: e.target.value })} placeholder='Title' className='p-2 bg-white rounded placeholder:gray-300 w-full' />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookdetails.author} onChange={(e) => setBookDetails({ ...bookdetails, author: e.target.value })} placeholder='Author' className='p-2 bg-white rounded placeholder:gray-300 w-full' />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookdetails.noofpages} onChange={(e) => setBookDetails({ ...bookdetails, noofpages: e.target.value })} placeholder='No of Pages' className='p-2 bg-white rounded placeholder:gray-300 w-full' />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookdetails.imageurl} onChange={(e) => setBookDetails({ ...bookdetails, imageurl: e.target.value })} placeholder='Image url' className='p-2 bg-white rounded placeholder:gray-300 w-full' />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookdetails.price} onChange={(e) => setBookDetails({ ...bookdetails, price: e.target.value })} placeholder='Price' className='p-2 bg-white rounded placeholder:gray-300 w-full' />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookdetails.dprice} onChange={(e) => setBookDetails({ ...bookdetails, dprice: e.target.value })} placeholder='Discount Prize' className='p-2 bg-white rounded placeholder:gray-300 w-full' />
                            </div>
                            <div className="mb-3">
                                <textarea rows={5} value={bookdetails.abstarct} onChange={(e) => setBookDetails({ ...bookdetails, abstarct: e.target.value })} placeholder='Abstarct' className='p-2 bg-white rounded placeholder:gray-300 w-full'></textarea>
                            </div>
                        </div>
                        <div className='px-3'>
                            <div className="mb-3">
                                <input type="text" value={bookdetails.publisher} onChange={(e) => setBookDetails({ ...bookdetails, publisher: e.target.value })} placeholder='Publisher' className='p-2 bg-white rounded placeholder:gray-300 w-full' />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookdetails.language} onChange={(e) => setBookDetails({ ...bookdetails, language: e.target.value })} placeholder='Language' className='p-2 bg-white rounded placeholder:gray-300 w-full' />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookdetails.isbn} onChange={(e) => setBookDetails({ ...bookdetails, isbn: e.target.value })} placeholder='ISBN' className='p-2 bg-white rounded placeholder:gray-300 w-full' />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookdetails.category} onChange={(e) => setBookDetails({ ...bookdetails, category: e.target.value })} placeholder='Category' className='p-2 bg-white rounded placeholder:gray-300 w-full' />
                            </div>

                            <div className="mb-3 flex justify-center items-center w-full mt-10">
                                {!preview ? <label htmlFor="imagefile">
                                    <input type="file" onChange={(e) => handleUpload(e)} name="" id="imagefile" style={{ display: 'none' }} />
                                    <img src={userD.profile == "" ? "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" : `${serverUrl}/upload/${userD.profile}`} alt="no image" style={{ width: '200px', height: '200px' }} />

                                </label> :
                                    <img src={preview} alt="no image" style={{ width: '200px', height: '200px' }} />}


                            </div>
                            {preview && <div className='flex justify-center items-center'>
                                {previewList?.map((item) => (
                                    <img src={item} alt="" style={{ width: '70px', height: '70px' }} className='mx-3 mb-3' />
                                ))}

                                {previewList.length < 3 && <label htmlFor="imagefile">
                                    <input type="file" onChange={(e) => handleUpload(e)} name="" id="imagefile" style={{ display: 'none' }} />
                                    <FontAwesomeIcon icon={faSquarePlus} className='fa-2x shadow ms-3 text-gray-500' />

                                </label>}


                            </div>}
                        </div>
                    </div>

                    <div className='flex justify-end'>
                        <button onClick={handleReset} className='bg-amber-600 p-3 rounded me-2 text-black hover:bg-white hover-border hover:border-amber-600 hover:text-amber-600'>Reset</button>
                        <button onClick={handleSubmit} className='bg-green-600 p-3 rounded me-2 text-black hover:bg-white hover-border hover:border-green-600 hover:text-green-600'>Submit</button>
                    </div>
                </div>}

                {bookstatus && <div className='p-10 my-20 shadow rounded'>

                    {userbook?.length > 0 ?
                        userbook?.map((item,index) => (
                        <div className='bg-gray-200 p-5 rounded mt-5' key={index}>
                            <div className='md:grid grid-cols-[3fr_1fr]'>
                                <div className='px-4'>
                                    <h1 className='text-2xl'>{item?.title}</h1>
                                    <h2>Bram Stoker</h2>
                                    <h3 className='text-blue-600'>{item?.dprice}</h3>
                                    <p>{item?.abstarct}</p>


                                    <div className='flex'>
                                        {item?.status == 'pending' ? <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFk7u3bD_LY6zJMkCKev7E8EU34OK3US0SPg&s" alt="" style={{ width: '70px', height: '70px' }} />

                                            : item?.status == 'approved' ? <img src="https://png.pngtree.com/png-vector/20230604/ourmid/pngtree-approved-stamp-with-green-color-vector-png-image_7120039.png" alt="" style={{ width: '70px', height: '70px' }} />

                                                : <img src="https://i.pinimg.com/736x/de/c8/19/dec81905ee90ac935ec2f91e9ece5ad3.jpg" alt="" style={{ width: '70px', height: '70px' }} />}
                                    </div>
                                </div>
                                <div className='px-4'>
                                    <img src={item?.imageurl} alt="" className='w-full' style={{ height: '300px' }} />
                                    <div className='flex justify-end mt-4'>
                                        <button type='button' onClick={() => deleteBook(item?._id)} className='mt-5 p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>))
                        :

                        <div className='flex justify-center items-center flex-col'>
                            <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="" style={{ width: '200px', height: '200px' }} />
                            <p className='text-red-600'>No Books Added Yet</p>
                        </div>
                    }


                </div>}

                {purchasestatus && <div className='p-10 my-20 shadow rounded'>
                    {userBroughtbook?.length > 0 ?
                        userBroughtbook?.map((item) => (
                            <div className='bg-gray-200 p-5 rounded'>
                                <div className='md:grid grid-cols-[3fr_1fr]'>
                                    <div className='px-4'>
                                        <h1 className='text-2xl'>{item?.title}</h1>
                                        <h2>{item?.author}</h2>
                                        <h3 className='text-blue-600'>$ 13</h3>
                                        <p>{item?.abstarct}</p>

                                         <div className='flex'>
                                            {item?.status == 'pending' ? <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFk7u3bD_LY6zJMkCKev7E8EU34OK3US0SPg&s" alt="" style={{ width: '70px', height: '70px' }} />

                                                : item?.status == 'approved' ? <img src="https://png.pngtree.com/png-vector/20230604/ourmid/pngtree-approved-stamp-with-green-color-vector-png-image_7120039.png" alt="" style={{ width: '70px', height: '70px' }} />

                                                    : <img src="https://i.pinimg.com/736x/de/c8/19/dec81905ee90ac935ec2f91e9ece5ad3.jpg" alt="" style={{ width: '70px', height: '70px' }} />}
                                        </div> 
                                    </div>
                                    <div className='px-4'>
                                        <img src={item?.imageurl} alt="" className='w-full' style={{ height: '300px' }} />
                                        <div>
                                            {/* <button className='mt-5 p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600'>Delete</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>))
                        :
                        <div className='flex justify-center items-center flex-col'>
                            <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="" style={{ width: '200px', height: '200px' }} />
                            <p className='text-red-600'>No Books Purchased Yet</p>
                        </div>}


                </div>}

            </div>
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
            <Footer />

        </>
    )
}

export default Profile