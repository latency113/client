import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ConcertDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const callApi = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/concert/"+id);
      const data_format = res.data;
      setData(data_format);
    } catch (error) {
      console.error("Error fetching concert details:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, [id]);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-2xl">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 flex justify-center min-h-screen gap-5 p-5">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative w-full h-[400px] overflow-hidden">
            <img
              src={data.concert.pictureUrl}
              alt={data.concert.concertName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5">
            <h1 className="text-3xl font-bold text-gray-800">
              {data.concert.concertName}
            </h1>
            <p className="text-gray-600 mt-2">วันที่: {data.concert.concertDate}</p>
            <p className="text-gray-600">สถานที่: {data.concert.venue}</p>
            <p className="text-gray-600">ราคา: {data.concert.price} บาท</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConcertDetail;
