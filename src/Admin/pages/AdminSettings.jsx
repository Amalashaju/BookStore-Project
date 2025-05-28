import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPen } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { updateProfileApi } from '../../services/allApi';
import { serverUrl } from '../../services/serverUrl';
import { adminProfileUpdateStatusContext } from '../../context/Contextshare';
function AdminSettings() {


  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    cPassword: "",
    profile: ""
  })

  console.log(adminDetails);
  const [preview, setPreview] = useState("")
  const [token, setToken] = useState("")
  const [existingProfileImage, setExistingProfileImage] = useState("")
  const [updateStatus, setupdateStatus] = useState({})
  const { setadminProfileUpdateStatus } = useContext(adminProfileUpdateStatusContext)


  const handleFileAdd = (e) => {
    // console.log(e.target.files[0]);
    setAdminDetails({ ...adminDetails, profile: e.target.files[0] })
    // console.log(adminDetails.profile);
    if (e.target.files[0] != "") {
      const url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
    }
  }
  console.log(preview);

  const handleReset = () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setAdminDetails({ username: user.username, password: user.password, cPassword: user.password })
      setExistingProfileImage(user.profile)
    }
    setPreview("")
  }

  const handleAdd = async () => {
    const { username, password, cPassword, profile } = adminDetails
    console.log(username, password, cPassword, profile);

    if (!username || !password || !cPassword) {
      toast.info('please fill the fields completely')

    }
    else {
      if (password != cPassword) {
        toast.warning('password must match')
      }
      else {
        if (preview) {

          const reqBody = new FormData()

          for (let key in adminDetails) {
            reqBody.append(key, adminDetails[key])
          }
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }
          const result = await updateProfileApi(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success('Profile updated successfuly')
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setupdateStatus(result.data)
            setadminProfileUpdateStatus(result.data)
          }
          else {
            toast.error('something went wrong')
            setupdateStatus(result)
          }

        }
        else {

          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }
          const result = await updateProfileApi({ username, password, profile: existingProfileImage }, reqHeader)
          console.log(result);

          if (result.status == 200) {
            toast.success('Profile updated successfuly')
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setupdateStatus(result.data)
             setadminProfileUpdateStatus(result.data)
          }
          else {
            toast.error('something went wrong')
            setupdateStatus(result)
          }
        }
      }
    }
  }
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setAdminDetails({ username: user.username, password: user.password, cPassword: user.password })
      setExistingProfileImage(user.profile)
    }
  }, [updateStatus])


  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-[1fr_4fr]'>
        <div className='bg-blue-200 flex flex-col items-center p-5'>
          <AdminSidebar />
        </div>
        <div>
          <div className="min-h-screen flex flex-col items-center justify-start p-4">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <div className="flex flex-col md:flex-row md:items-start items-center gap-8 w-full max-w-6xl">

              {/* Left Text Section */}
              <div className="w-full md:w-1/2 text-gray-700 space-y-4 p-4">
                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id maxime quia asperiores in cupiditate voluptatem quisquam nemo vitae odio, facilis aperiam. Ipsum incidunt labore asperiores! Blanditiis soluta fuga aut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed neque, facilis?
                </p>
                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id maxime quia asperiores in cupiditate voluptatem quisquam nemo vitae odio, facilis aperiam. Ipsum incidunt labore asperiores! Blanditiis soluta fuga aut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed neque, facilis, consequatur quos eveniet inventore ipsam beatae iure fugiat eligendi quae laborum incidunt eum quis, est blanditiis exercitationem velit excepturi?
                </p>
              </div>

              {/* Right Form Section */}
              <div className="w-full md:w-1/2 bg-blue-100 p-6 rounded-lg">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    <label htmlFor="profilefile" className="relative cursor-pointer">
                      <input type="file" onChange={(e) => handleFileAdd(e)} id="profilefile" style={{ display: "none" }} />
                      {existingProfileImage == "" ? <img
                        src={preview ? preview : "https://cdn-icons-png.freepik.com/512/8742/8742495.png"}
                        alt="Profile"
                        className="h-40 w-40 rounded-full object-cover bg-gray-300"
                      /> :
                        <img
                          src={preview ? preview : `${serverUrl}/upload/${existingProfileImage}`}
                          alt="Profile"
                          className="h-40 w-40 rounded-full object-cover bg-gray-300"
                        />}
                      <div className="absolute bottom-2 right-2 bg-yellow-300 text-white p-2 rounded-full">
                        <FontAwesomeIcon icon={faPen} />
                      </div>
                    </label>
                  </div>
                </div>

                <form className="space-y-4">
                  <input
                    type="text" value={adminDetails.username} onChange={(e) => { setAdminDetails({ ...adminDetails, username: e.target.value }) }}
                    placeholder="Username"
                    className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="password" value={adminDetails.password} onChange={(e) => { setAdminDetails({ ...adminDetails, password: e.target.value }) }}
                    placeholder="Password"
                    className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="password" value={adminDetails.cPassword} onChange={(e) => { setAdminDetails({ ...adminDetails, cPassword: e.target.value }) }}
                    placeholder="Confirm password"
                    className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <div className="flex flex-col md:flex-row gap-4">
                    <button onClick={handleReset}
                      type="button"
                      className="flex-1 bg-yellow-400 hover:bg-white hover:text-yellow-400 hover:border hover:border-yellow-400 text-white font-bold py-2 rounded"
                    >
                      Reset
                    </button>
                    <button
                      type="button" onClick={handleAdd}
                      className="flex-1 bg-green-600 hover:bg-white hover:text-green-600 hover:border hover:border-green-600 text-white font-bold py-2 rounded"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>

        </div>
      </div>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
      <Footer />
    </>
  )
}

export default AdminSettings