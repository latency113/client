import React from 'react'
import { NavLink } from 'react-router-dom';

const ConcertCard = (props) => {
    const getScheduleDates = (schedule) => {
      if (!schedule || schedule.length === 0) return "";
  
      const sortedDates = schedule
        .map((s) => new Date(s.date))
        .sort((a, b) => a - b);
  
      const firstDate = sortedDates[0].toLocaleDateString();
      const lastDate = sortedDates[sortedDates.length - 1].toLocaleDateString();
  
      return `${firstDate} - ${lastDate}`;
    };
  
    return (
      <div className="bg-white rounded-lg shadow-md  cursor-pointer hover:shadow-lg w-full max-w-[420px] mx-auto">
        {/* Image Section */}
        <div className="w-full h-[250px] overflow-hidden rounded-t-lg">
          <img
            src={props.pictureUrl}
            alt={props.concertName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-t-lg"
          />
        </div>
  
        {/* Content Section */}
        <div className="p-4 flex flex-col gap-4">
          {/* Concert Name */}
          <div className="text-xl font-semibold text-gray-900 truncate">
            {props.concertName}
          </div>
  
          {/* Venue */}
          <div className="flex items-center text-sm text-gray-700">
            <svg
              className="w-5 h-5 text-gray-600 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                clipRule="evenodd"
              />
            </svg>
            <span>{props.venue}</span>
          </div>
  
          {/* Schedule */}
          <div className="text-sm text-gray-600">
            {props.Schedule && props.Schedule.length > 0 ? (
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-5 h-5 text-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{getScheduleDates(props.Schedule)}</span>
              </div>
            ) : (
              <div>No schedule available</div>
            )}
          </div>
  
          {/* View Details Button */}
          <div className="mt-4 flex justify-end">
            <NavLink
              to={`/concert/${props.id}`}
              className="flex justify-center w-full mt-3 text-blue-500 py-2 px-4 text-center gap-1 border-transparent hover:border-blue-500 hover:border-b-2 hover:pb-[5px] active:text-blue-700 transition-all duration-200"
            >
              ดูรายละเอียด
            </NavLink>
          </div>
        </div>
      </div>
    );
  };

export default ConcertCard
