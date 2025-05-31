import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { googleLoginApi, loginApi, registerApi } from "../services/allApi";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'


function Auth({ register }) {

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })

  console.log(userDetails);
  const navigate = useNavigate()

  const handleRegister = async () => {
    console.log("inside register function");

    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.info('please fill the details')
    }
    else {
      const result = await registerApi({ username, email, password })
      console.log(result);
      if (result.status == 200) {
        toast.success('Register successful')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      }
      else if (result.status == 409) {
        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
      else {
        toast.error('Something went wrong')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }

  }

  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info('please enter the complete details')
    }
    else {
      const result = await loginApi({ email, password })
      console.log(result);

      if (result.status == 200) {
        toast.success('login successfull')
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)

        setTimeout(() => {
          if (result.data.existingUser.email == 'bookstoreadmin@gmail.com') {
            navigate('/admin-home')
          }
          else {
            navigate('/')
          }
        },2500)


      }
      else if (result.status == 401) {
        toast.warning(result.response.data);
        setUserDetails({
          username: "",
          email: "",
          password: "",
        });
      }

      else if (result.status == 404) {
        toast.warning(result.response.data);
        setUserDetails({
          username: "",
          email: "",
          password: "",
        });
      }

      else {
        toast.error("Something went wrong");
        setUserDetails({
          username: "",
          email: "",
          password: "",
        });
      }
    }

  }

  const handleGoogleLogin = async (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential)
    console.log(details);

    const result = await googleLoginApi({ username: details.name, email: details.email, password: 'googlepswd', photo: details.picture })
    console.log(result);
    if (result.status == 200) {
      toast.success('login successfull')
      sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token", result.data.token)

      setTimeout(() => {
        if (result.data.existingUser.email == 'bookstoreadmin@gmail.com') {
          navigate('/admin-home')
        }
        else {
          navigate('/')
        }
      })


    }



  }

  return (
    <>
      <div id="auth" className="">
        <div className="md:grid grid-cols-3">
          <div></div>
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-3xl mt-5">BOOK STORE</h1>
            <form
              action=""
              className="w-full mt-10 bg-gray-900 p-10 flex justify-center items-center flex-col"
            >
              <div
                className="text-white border border-white flex justify-center items-center"
                style={{ width: "70px", height: "70px", borderRadius: "50%" }}
              >
                <FontAwesomeIcon icon={faUser} className="fa-2x" />
              </div>
              {!register ? (
                <h2 className="text-white mt-5 text-3xl">Login </h2>
              ) : (
                <h2 className="text-white mb-5 text-3xl">Register </h2>
              )}

              {register && (
                <div className="mb-5 w-full mt-8">
                  <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                    type="text"
                    className="p-2 rounded placeholder:gray-600 bg-white w-full "
                    placeholder="Username"
                  />
                </div>
              )}

              <div className="mb-5 w-full mt-8">
                <input value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  type="text"
                  className="p-2 rounded placeholder:gray-600 bg-white w-full "
                  placeholder="Email Id"
                />
              </div>

              <div className="mb-5 w-full mt-8">
                <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                  type="text"
                  className="p-2 rounded placeholder:gray-600 bg-white w-full "
                  placeholder="Password"
                />
                {/* <FontAwesomeIcon icon={faEye} className='' /> */}
              </div>

              <div className="mb-5 w-full flex justify-between">
                <p className="text-amber-300">Never share your Password</p>
                {!register && (
                  <p className="text-white underline">Forget Password</p>
                )}
              </div>

              {register ? (
                <div className="mb-2 w-full">
                  <button onClick={handleRegister} type="button" className="bg-green-800 text-white w-full p-3 rounded">
                    Register
                  </button>
                </div>
              ) : (
                <div className="mb-2 w-full">
                  <button type="button" onClick={handleLogin} className="bg-green-800 text-white w-full p-3 rounded">
                    Login
                  </button>
                </div>
              )}

              {!register && (
                <p className="text-white">
                  ------------------------------or-------------------------------
                </p>
              )}
              {!register && (
                <div className="mb-5 mt-3 w-full">
                  {/* <button className="bg-white text-black w-full p-3 rounded">
                    Sign In with Google
                  </button> */}
                  <GoogleLogin width={'300px'}
                    onSuccess={credentialResponse => {
                      handleGoogleLogin(credentialResponse)

                    }}

                    onError={() => {
                      toast.error('Login Failed');
                    }}
                  />;
                </div>
              )}

              {register ? (
                <p className="text-white">
                  Are you a Already User ?{" "}
                  <Link to={"/login"} className="text-blue-800 underline">
                    Login
                  </Link>
                </p>
              ) : (
                <p className="text-white">
                  Are you a New User ?{" "}
                  <Link to={"/register"} className="text-blue-800 underline">
                    Register
                  </Link>
                </p>
              )}
            </form>
          </div>

          <div></div>
        </div>
      </div>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </>
  );
}


export default Auth;