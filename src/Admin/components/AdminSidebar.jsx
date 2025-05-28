import { faBagShopping } from '@fortawesome/free-solid-svg-icons/faBagShopping'
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook'
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../../services/serverUrl'
import { adminProfileUpdateStatusContext } from '../../context/Contextshare'


function AdminSidebar() {
  const [HomeStatus, setHomeStatus] = useState(false)
  const [BookStatus, setBookStatus] = useState(false)
  const [CareerStatus, setCareerStatus] = useState(false)
  const [SettingStatus, setSettingStatus] = useState(false)
  const [adminD, setadminD] = useState({
    username: "",
    profile: ""
  })
  const navigate = useNavigate()
  const {adminProfileUpdateStatus} =useContext(adminProfileUpdateStatusContext)
  const filter = (data) => {
    if (data == 'home') {
      navigate('/admin-home')
    }
    else if (data == 'books') {
      navigate('/admin-books')
    }
    else if (data == 'careers') {
      navigate('/admin-careers');
    } else if (data == 'settings') {
      navigate('/admin-settings');
    } else {
      navigate('*');
    }


  }
  useEffect(() => {
    if (location.pathname == '/admin-home') {
      setHomeStatus(true)
    }
    else if (location.pathname == '/admin-books') {
      setBookStatus(true)
    }
    else if (location.pathname == '/admin-careers') {
      setCareerStatus(true)
    }
    else if (location.pathname == '/admin-settings') {
      setSettingStatus(true)
    }
    else {
      console.log('no such page');

    }
    const user = JSON.parse(sessionStorage.getItem("existingUser"))
    setadminD({ username: user.username, profile: user.profile })

  }, [adminProfileUpdateStatus])
  return (
    <>
      <div className='flex justify-center items-center flex-col'>
        <img src={adminD.profile==""? "https://cdn-icons-png.freepik.com/512/8742/8742495.png" : `${serverUrl}/upload/${adminD.profile}`} alt="" style={{ width: "150px", height: "150px",borderRadius:'50%' }} />
        <h3 className='mt-5'>{adminD.username}</h3>
      </div>
      <div className='my-5'>
        <div className='mb-3'>
          <input type="radio" id='home' name='filter' readOnly checked={HomeStatus} />
          <label htmlFor="home" onClick={() => filter('home')} className='ms-3' >         <FontAwesomeIcon icon={faHome} className="me-3" />
            Home</label>
        </div>

        <div className='mb-3'>
          <input type="radio" id='allbooks' name='filter' readOnly checked={BookStatus} />
          <label htmlFor="allbooks" onClick={() => filter('books')} className='ms-3' >         <FontAwesomeIcon icon={faBook} className="me-3" />
            All Books</label>
        </div>

        <div className='mb-3'>
          <input type="radio" id='careers' name='filter' readOnly checked={CareerStatus} />
          <label htmlFor="careers" onClick={() => filter('careers')} className='ms-3' >         <FontAwesomeIcon icon={faBagShopping} className="me-3" />
            Careers</label>
        </div>

        <div className='mb-3'>
          <input type="radio" id='settings' name='filter' readOnly checked={SettingStatus} />
          <label htmlFor="settings" onClick={() => filter('settings')} className='ms-3' >         <FontAwesomeIcon icon={faGear} className="me-3" />
            Settings</label>
        </div>
      </div>
    </>
  )
}

export default AdminSidebar