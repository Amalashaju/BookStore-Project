import React, { useEffect, useState, useContext } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { homeBookApi } from '../../services/allApi'
import { toast, ToastContainer } from 'react-toastify'
import { searchKeyContext } from '../../context/Contextshare'

function Home() {

    const [homeBook, setHomeBook] = useState([])
    const { searchKey, setSearchKey } = useContext(searchKeyContext)
    const navigate = useNavigate()

    const getAllBookHome = async () => {
        const result = await homeBookApi()
        // console.log(result);
        if (result.status == 200) {
            setHomeBook(result.data);

        }
    }

    const handleSearch = () => {
        console.log('inside Handle Search')
        const token =sessionStorage.getItem("token")

        if (searchKey == "") {
            toast.info('please enter title of the book')
        }
        else if (!token) {
            toast.info('please login')
            setTimeout(()=>{
                navigate('/login')
            },2500)
           
        }
        else if (searchKey && token) {
            navigate('/all-Books')
        }
        else {
            toast.info('something went wrong')
        }


    }

    useEffect(() => {
        getAllBookHome()
    }, [])
    return (
        <>
            <Header />
            <header className='flex justify-center items-center'>
                <div id='main' className='flex justify-center items-center w-full'>
                    <div className='md:grid grid-cols-3 w-full'>
                        <div></div>
                        <div className='text-white flex justify-center items-center flex-col'>
                            <h1 className='text-5xl'>Wonderful Gifts</h1>
                            <p>Give your family and friends a book</p>

                            <div className='flex mt-10 w-full'>
                                <input type="text" placeholder='Search Book' className='py-2 px-4 text-black bg-white rounded-3xl placeholder-gray-400 w-full' onChange={(e) => setSearchKey(e.target.value)} />
                                <FontAwesomeIcon onClick={handleSearch} icon={faMagnifyingGlass} className='text-blue-800 ' style={{ marginTop: '11px', marginLeft: '-30px' }} />
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </header>
            {/* NEW ARRIVALS */}

            <section className='flex justify-center items-center flex-col md:px-40 md:p-10 p-5'>
                <h1>NEW ARRIVALS</h1>
                <h4>Explore Our Latest Collection</h4>

                <div className='md:grid grid-cols-4 w-full mt-5'>
                    {
                        homeBook?.length > 0 ?
                            homeBook?.map((item,index) => (<div className='p-3 shadow-2xl' key={index}>
                                <img src={item?.imageurl} alt="" style={{ height: '300px', width: '100%' }} />
                                <div className='flex justify-center flex-col items-center mt-3'>
                                    <p className='text-blue-700'>{item?.author}</p>
                                    <h3>{item?.title.slice(0,21)}...</h3>
                                    <p>${item?.dprice}</p>
                                </div>
                            </div>)) :
                            <p>loading</p>
                    }

                </div>

                <div className='flex justify-center items-center my-5'>
                    <Link to={'/all-Books'}><button className='px-3 py-2 bg-blue-950 text-white hover:border hover:border-blue-950 hover:text-blue-950 hover:bg-white'>Explore More</button></Link>
                </div>
            </section>

            {/* author */}
            <section className='flex justify-center items-center flex-col md:px-40 md:p-10 p-5'>
                <div className='md:grid grid-cols-2 w-full'>
                    <div>
                        <div className='flex justify-center items-center flex-col '>
                            <h3>FEATURED AUTHORS</h3>
                            <h3 className='text-2xl'> Captivates with every word</h3>
                        </div>
                        <p className="mt-6 text-justify">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, aut saepe vitae perspiciatis autem nemo, laudantium perferendis cum ipsa impedit cupiditate minima ipsum necessitatibus magnam dignissimos quidem recusandae vero delectus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit eveniet error facilis necessitatibus optio delectus ad a nemo, aliquam culpa, dolorum dolor molestias, ullam fugiat voluptates. Corrupti accusantium quo maxime!</p>
                        <p className="mt-6 text-justify">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, aut saepe vitae perspiciatis autem nemo, laudantium perferendis cum ipsa impedit cupiditate minima ipsum necessitatibus magnam dignissimos quidem recusandae vero delectus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit eveniet error facilis necessitatibus optio delectus ad a nemo, aliquam culpa, dolorum dolor molestias, ullam fugiat voluptates. Corrupti accusantium quo maxime!</p>
                    </div>

                    <div className='px-10 pt-8'>
                        <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA4L3Jhd3BpeGVsX29mZmljZV8zNV9iZWF1dGlmdWxfc21pbGluZ195b3VuZ19pbmRpYW5fYnVzaW5lc3Nfd29tYV8yYWM3MjMyNS1jZmU3LTQ5ODgtODBkNi03YjViZTg3ODYzNjNfMS5qcGc.jpg" alt="" className='w-full' style={{ height: '350px' }} />
                    </div>
                </div>
            </section>

            {/* testimonials */}
            <div className='flex justify-center items-center flex-col md:px-40 md:py-10 p-6'>
                <h3>TESTIMONIALS</h3>
                <h3 className='text-2xl'>See What Others Are Saying</h3>
                <img src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="" style={{ width: '200px', height: "200px", borderRadius: '50%' }} className='mt-5' />
                <h6 className='mt-3'>Treesa Joseph</h6>
                <p className='mt-3 text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem deleniti aperiam harum tenetur ad numquam voluptatem libero alias et. Doloremque accusamus eum voluptatibus accusantium tenetur doloribus ullam reprehenderit quibusdam a? Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias earum dolore illo nesciunt. Velit accusamus soluta suscipit architecto aut, distinctio consectetur quae iste eius laboriosam culpa odio iure corporis deleniti.</p>
            </div>


            <ToastContainer theme="colored" position="top-center" autoClose={2000} />
            <Footer />
        </>
    )
}

export default Home
