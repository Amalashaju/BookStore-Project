import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { updateUserProfileApi } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'
import { useContext } from 'react'
import { userProfileUpdateStatusContext } from '../../context/Contextshare'

function EditProfile() {
  const [offcanvasStatus, setOffCanvasStatus] = useState(false)
  const [userDetails, setuserDetails] = useState({
    username: "",
    password: "",
    cPassword: "",
    profile: "",
    bio: ""

  })
  console.log(userDetails);
  const [preview, setPreview] = useState("")
  const [token, setToken] = useState("")
  const [existingProfileImage, setExistingProfileImage] = useState("")
   const [updateStatus, setupdateStatus] = useState({})
   const {setuserProfileUpdateStatus} =useContext(userProfileUpdateStatusContext)

  const handleFileAdd = (e) => {
    // console.log(e.target.files[0]);
    setuserDetails({ ...userDetails, profile: e.target.files[0] })
    if (e.target.files[0] != "") {
      const url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
    }
  }
  console.log(preview);

  //reset function
  const handleReset = () => {
    setuserDetails({
      username: "",
      password: "",
      cPassword: "",
      profile: "",
      bio: ""
    })
    setPreview("")
  }

  const handleAdd = async () => {
    const { username, password, cPassword, profile, bio } = userDetails
    console.log(username, password, cPassword, profile, bio);

    if (!username || !password || !cPassword || !bio) {
      toast.info('Please fill the fields completely')
    }
    else {
      if (password != cPassword) {
        toast.warning('password must match')
      }
      else {
        if (preview) {
          const reqBody = new FormData()

          for (let key in userDetails) {
            reqBody.append(key, userDetails[key])
          }
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }

          const result = await updateUserProfileApi(reqBody, reqHeader)
          console.log(result);
          if(result.status==200){
            toast.success('Pofile updated successfully')
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
            setupdateStatus(result.data)
            setuserProfileUpdateStatus(result.data)

          }
          else{
            toast.error('Something went wrong')
            setupdateStatus({})
            setuserProfileUpdateStatus(result)
          }

        }
        else {
          const reqHeader = {
            "Authorization": `Bearer ${token}`

          }
          const result = await updateUserProfileApi({username,password,bio,profile:existingProfileImage}, reqHeader)
          console.log(result);
           if(result.status==200){
            toast.success('Pofile updated successfully')
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
            setupdateStatus(result.data)
            setuserProfileUpdateStatus(result.data)

          }
          else{
            toast.error('Something went wrong')
            setupdateStatus({})
            setuserProfileUpdateStatus(result)
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
      setuserDetails({ username: user.username, password: user.password, cPassword: user.password ,bio:user.bio})
      setExistingProfileImage(user.profile)
    }
  }, [updateStatus])



  return (
    <>
      <div><button onClick={() => setOffCanvasStatus(true)} className='text-blue-600 border border-blue-600 rounded p-3 hover:bg-blue-600 hover:text-white'> <FontAwesomeIcon icon={faPenToSquare} />Edit</button></div>


      {offcanvasStatus && <div>
        <div className='fixed inset-0 bg-gray-500/75 transition-opacity w-full h-full' onClick={() => setOffCanvasStatus(false)}></div>

        <div className='bg-white h-full w-90 z-50 fixed top-0 left-0'>
          <div className='bg-gray-900 px-3 py-4 flex justify-between text-white text-2xl'>
            <h1>Edit User Profile</h1>
            <FontAwesomeIcon onClick={() => setOffCanvasStatus(false)} icon={faXmark} />
          </div>

          <div className='flex justify-center items-center flex-col my-5'>
            <label htmlFor='Profilefile'>
              <input id='Profilefile' onChange={(e) => handleFileAdd(e)} type='file' style={{ display: 'none' }} />

              {existingProfileImage == "" ? <img className='z-52' src={preview ? preview : 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png'} alt='no image'
                style={{ width: '200px', height: '200px' }} /> :
                <img className='z-52' src={preview ? preview : `${serverUrl}/upload/${existingProfileImage}`} alt='no image'
                  style={{ width: '200px', height: '200px' }} />}


              <div
                className='bg-yellow-300 z-53 fixed text-white py-3 px-4 rounded'
                style={{ marginLeft: '135px', marginTop: '-50px' }}
              >
                <FontAwesomeIcon icon={faPen} />
              </div>
            </label>

            <div className="mb-3 w-full mt-5 px-5">
              <input type="text" value={userDetails.username} onChange={(e) => setuserDetails({ ...userDetails, username: e.target.value })} placeholder="Username" className="w-full border border-gray-300 placeholder:bg-gray-200 p-2 rounded" />
            </div>

            <div className="mb-3 w-full mt-5 px-5">
              <input type="text" value={userDetails.password} onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })} placeholder="Password" className="w-full border border-gray-300 placeholder:bg-gray-200 p-2 rounded" />
            </div>

            <div className="mb-3 w-full mt-5 px-5">
              <input type="text" value={userDetails.cPassword} onChange={(e) => setuserDetails({ ...userDetails, cPassword: e.target.value })} placeholder="Conform Password" className="w-full border border-gray-300 placeholder:bg-gray-200 p-2 rounded" />
            </div>

            <div className="mb-3 w-full mt-5 px-5">
              <textarea type="text" value={userDetails.bio} onChange={(e) => setuserDetails({ ...userDetails, bio: e.target.value })} placeholder="Bio" className="w-full border border-gray-300 placeholder:bg-gray-200 p-2 rounded"></textarea>
            </div>

            <div className='flex justify-end w-full px-5 mt-5'>
              <button onClick={handleReset} type='button'
                className='bg-amber-600 text-black rounded py-3 px-4 hover:text-amber-600 hover:border hover:border-amber-600 hover:bg-white'>Reset
              </button>

              <button onClick={handleAdd} type='button'
                className='bg-green-600 text-white rounded py-3 px-4 hover:text-green-600 hover:border hover:border-green-600 hover:bg-white ms-4'>
                Update
              </button>
            </div>

          </div>
        </div>
      </div>}
      
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </>
  )
}

export default EditProfile