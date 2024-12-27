import React, { useState, useEffect } from 'react';
import Navbar from './../../components/Navbar';
import Footer from './../../components/Footer';

const Profile = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:4000/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setError('ไม่พบข้อมูลผู้ใช้');
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className='min-h-screen text-center mt-5 text-5xl'>
          <p>กำลังโหลด...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <p>{error}</p>
        <Footer />
      </div>
    );
  }


  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <h1 className='text-center text-2xl mt-5 font-semibold'>โปรไฟล์ของคุณ</h1>
        {data ? (
          <div className="text-xl p-5">
            <div>
              <strong>โปรไฟล์:</strong>
              <img src={data.user.pictureUrl} alt="Profile" className='rounded-full border-1 w-[80px] h-[80px]'/>
            </div>
          <p><strong>ชื่อผู้ใช้:</strong> {data.user.name}</p>
          <p><strong>อีเมล:</strong> {data.user.email}</p>
          <p><strong>เบอร์โทร:</strong> {data.user.phoneNumber}</p>
        </div>

        ) : (
          <>
          <div className='min-h-screen text-2xl'>
            <p>ไม่พบข้อมูลโปรไฟล์</p>
          </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
