import React from 'react'
import Footer from "../../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { faBackward } from "@fortawesome/free-solid-svg-icons/faBackward";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Paymenterror() {
  return (
      <>
      <Header />
      <div className="container my-10">
        <div className="md:grid grid-cols-2 px-20 justify-center items-center flex-col">
          <div className="">
            <h1 className="md:text-4xl text-green-700">Sorry ! Your Payment is UnSuccessfull</h1>
            <p className="my-4 text-2xl ">
             We Apologize for the inconvience caused !!
            </p>
            <Link to={"/all-Books"}>
              <button className="bg-blue-700 text-white px-4 py-2 rounded ">
               <FontAwesomeIcon icon={faBackward} className="me-3" /> Explore More Books
              </button>
            </Link>{" "}
          </div>

          <div className="flex justify-center items-center">
            <img className="w-full" src="https://i.pinimg.com/originals/9d/16/7e/9d167e72839894c971c90f60ab00d916.gif" alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Paymenterror