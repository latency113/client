import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import moment from 'moment';


const Concert = () => {
  const [concerts, setConcerts] = useState([]);

  const callApi = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/concerts");
      const data_format = res.data.concerts;
      setConcerts(data_format);
    } catch (error) {
      console.error("Error fetching concerts:", error.message);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800">
        <Navbar />
        <div>
          <h1 className="text-white text-center text-4xl m-5">Concert</h1>
          {/* corae */}
          <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 px-[170px]">
            {concerts.map((concert) => (
              <ConcertCard key={concert.id} {...concert} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const ConcertCard = (props) => {
  return (
    <div className="bg-white rounded-md shadow-md transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400 w-[280px]">
      <div className="p-2">
        <div className="w-full h-[250px] overflow-hidden rounded-md">
          <img
            src={props.pictureUrl || "/placeholder-image.jpg"}
            alt={props.concertName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-xl py-2 font-semibold text-gray-800 truncate">
          {props.concertName}
        </div>
        <div className="text-md pb-2 text-gray-600">{props.venue}</div>
        <div className="text-md pb-2 text-gray-600">{moment(props.concertDate).format('DD/MM/YYYY')}</div>
      </div>
      <div className="flex justify-center items-center p-3">
        <NavLink
          to={`/concert/${props.id}`}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-indigo-500 hover:from-pink-400 text-white text-center py-2 px-4 text-sm rounded-lg"
        >
          ดูรายละเอียด
        </NavLink>
      </div>
    </div>
  );
};

export default Concert;
