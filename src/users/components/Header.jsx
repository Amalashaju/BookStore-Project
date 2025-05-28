import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faAngleDown, faBars } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons/faAddressCard";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons/faPowerOff";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../pages/Profile";
import { userProfileUpdateStatusContext } from "../../context/Contextshare";
import { serverUrl } from "../../services/serverUrl";

function Header() {
  const [status, setStatus] = useState(false);
  const [dropdownstatus, setDropDownStatus] = useState(false);
  const[userD ,setuserD]=useState({
    Profile:""
  })
  const {userProfileUpdateStatus}=useContext(userProfileUpdateStatusContext)
  const navigate=useNavigate()
  const logout=()=>{
    sessionStorage.removeItem('existingUser')
    sessionStorage.removeItem('token')
    navigate('/')
  }

  // token storage
  const [token, setToken] = useState("")

  useEffect(()=>{

    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      setToken(token)
      const user=JSON.parse(sessionStorage.getItem('existingUser'))
      setuserD({Profile:user.profile})
    }

  },[userProfileUpdateStatus])
  return (
    <>
      <div className="grid grid-cols-3 p-3">
        <div className="flex  items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGqKZ_XghbsCkjKJFYhJ-tu1uSbYJPeqsJ3w&s"
            alt=""
            style={{ height: "50px", width: "50px" }}
          />
          <h1 className="text-3xl md:hidden ms-2 ">BOOKSTORE</h1>
        </div>

        <div className="md:flex justify-center items-center hidden">
          <h1 className="text-3xl ">BOOKSTORE</h1>
        </div>

        <div className="md:flex justify-end items-center hidden">
          <FontAwesomeIcon icon={faInstagram} className="me-3" />
          <FontAwesomeIcon icon={faTwitter} className="me-3" />
          <FontAwesomeIcon icon={faFacebook} className="me-3" />
          <FontAwesomeIcon icon={faLinkedin} className="me-3" />

         {!token?  <Link to="/login">
            <button className="border border-black rounded px-3 py-2">
              {" "}
              <FontAwesomeIcon icon={faUser} className="me-3" /> Login
            </button>
          </Link> :

          
          <div className="relative inline-block text-left">
             {/* dropdown */}
            <div>
              <button
                onClick={() => setDropDownStatus(!dropdownstatus)}
                type="button"
                className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs  hover:bg-gray-50"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                <img
                  src={userD.Profile==''? "https://cdn-icons-png.flaticon.com/512/149/149071.png": `${serverUrl}/upload/${userD.Profile}`}
                  className="mx-2 rounded-full" 
                  alt=""
                  style={{ width: "40px", height: "40px" }}
                />
              </button>
            </div>
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg  focus:outline-hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              {dropdownstatus && (
                <div className="py-1" role="none">
                  <Link to="/profile">
                    <p
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      <FontAwesomeIcon icon={faAddressCard} /> Profile
                    </p>
                  </Link>{" "}
                  <p onClick={logout}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-1"
                  >
                    <FontAwesomeIcon icon={faPowerOff} /> Logout
                  </p>
                </div>
              )}
            </div>
          </div>
          }

        </div>
      </div>

      {/* mobile */}
      <nav className="p-3 w-full bg-gray-900 text-white md:flex justify-center ">
        <div className="flex justify-between items-center md:hidden">
          <span onClick={() => setStatus(!status)}>
            {" "}
            <FontAwesomeIcon icon={faBars} className="text-white" />
          </span>

         {!token ? <Link to="/login">
            {" "}
            <button className="border border-white rounded px-3 py-2">
              {" "}
              <FontAwesomeIcon icon={faUser} className="me-3" /> Login
            </button>
          </Link>

          :
         
          
          <div className="relative inline-block text-left">
            {/* dropdown */}
            <div>
              <button
                onClick={() => setDropDownStatus(!dropdownstatus)}
                type="button"
                className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs  hover:bg-gray-50"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  className="mx-2"
                  alt=""
                  style={{ width: "40px", height: "40px" }}
                />
              </button>
            </div>

            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg  focus:outline-hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              {dropdownstatus && (
                <div className="py-1" role="none">
                  <Link to="/profile">
                    <p
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      <FontAwesomeIcon icon={faAddressCard} /> Profile
                    </p>
                  </Link>{" "}
                  <p onClick={logout}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-1"
                  >
                    <FontAwesomeIcon icon={faPowerOff} /> Logout
                  </p>
                </div>
              )}
            </div>
          </div>
          }

        </div>

        <ul
          className={
            status ? "md:flex" : " md:flex justify-center gap-12 hidden"
          }
        >
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/all-Books">
            {" "}
            <li>Books</li>
          </Link>
          <Link to="/careers">
            {" "}
            <li>Careers</li>
          </Link>
          <li>Contact</li>
        </ul>
      </nav>
    </>
  );
}

export default Header;