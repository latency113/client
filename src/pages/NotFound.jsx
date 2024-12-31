import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <>
    <Navbar/>
    <div className='min-h-screen'>
      ไม่พบหน้าที่ต้องการ
    </div>
    <Footer/>
    </>
  )
}

export default NotFound
