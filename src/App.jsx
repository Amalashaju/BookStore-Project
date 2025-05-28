
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import PagenotFound from './pages/PagenotFound'
import Home from './users/pages/Home'
import Auth from './pages/Auth'
import Preloader from './components/Preloader'
import AllBooks from './users/pages/AllBooks'
import Careers from './users/pages/Careers'
import Contact from './users/pages/Contact'
import Profile from './users/pages/Profile'
import AdminSettings from './Admin/pages/AdminSettings'
import AdminCareers from './Admin/pages/AdminCareers'
import AdminBooks from './Admin/pages/AdminBooks'
import AdminHome from './Admin/pages/AdminHome'
import AdminHeader from './Admin/components/AdminHeader'
import AdminSidebar from './Admin/components/AdminSidebar'
import Viewbook from './users/pages/Viewbook'
import Paymenterror from './users/pages/Paymenterror'
import Paymentsuccess from './users/pages/Paymentsuccess'






function App() {

  const [isloading, setIsloading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsloading(true)
    }, 2000)
  }, [])

  return (
    <>

      <Routes>
        <Route path='/' element={isloading ? <Home /> : <Preloader />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/all-Books' element={<AllBooks />} />
        <Route path='/careers' element={<Careers />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/admin-home' element={isloading ? <AdminHome /> : <Preloader />} />
        <Route path='/admin-books' element={<AdminBooks />} />
        <Route path='/admin-careers' element={<AdminCareers />} />
        <Route path='/admin-settings' element={<AdminSettings />} />
        <Route path='/admin-header' element={<AdminHeader />} />
        <Route path='/admin-sidebar' element={<AdminSidebar />} />
        <Route path='/view-books/:id' element={<Viewbook />} />
        <Route path='/payment-success' element={<Paymentsuccess/>} />
        <Route path='/payment-error' element={<Paymenterror/>} />
        <Route path='*' element={<PagenotFound />} />

      </Routes>

    </>
  )
}

export default App
