import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import concertService from "../services/concert.service";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { debounce } from "lodash";

const SearchResults = () => {
  const [concertList, setConcertList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const fetchConcert = (query) => {
    if (!query) return;
    concertService
      .getQuery(query)
      .then((response) => {
        setConcertList(response.data.concerts);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Create debounced function to delay API call while typing
  const debouncedFetchConcert = debounce(fetchConcert, 500);

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      fetchConcert(query);
    }
  }, [query]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    debouncedFetchConcert(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col px-4 sm:px-6 lg:px-8">
        <div className="text-center py-6 mt-10">
          <h1 className="text-3xl font-semibold text-gray-800">ผลการค้นหา</h1>
          <div className="mt-4">
            <input
              type="text"
              placeholder="ค้นหาคอนเสิร์ต"
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="container flex justify-center mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {concertList.length > 0 ? (
              concertList.map((concert) => (
                <div
                  key={concert.id}
                  className="concert-card bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col justify-between p-4">
                    <div className="w-full flex justify-center mb-4">
                      <div className="w-48 h-48 overflow-hidden rounded-lg">
                        <img
                          src={concert.pictureUrl}
                          alt={concert.concertName}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <h2 className="text-xl font-semibold text-gray-900 truncate">
                        {concert.concertName}
                      </h2>
                      <div className="text-sm text-gray-700 flex items-center space-x-2">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span>{concert.venue}</span>
                      </div>

                      <div className="text-sm text-gray-600 flex gap-1">
                        {concert.Schedule && concert.Schedule.length > 0 ? (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="flex items-center gap-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="lucide lucide-calendar"
                                >
                                  <path d="M8 2v4" />
                                  <path d="M16 2v4" />
                                  <rect
                                    width="18"
                                    height="18"
                                    x="3"
                                    y="4"
                                    rx="2"
                                  />
                                  <path d="M3 10h18" />
                                </svg>
                                {new Date(
                                  concert.Schedule[0].date
                                ).toLocaleDateString()}{" "}
                              </span>
                            </div>
                            {concert.Schedule.length > 1 && (
                              <div className="flex items-center gap-2 mb-2">
                                <span className="flex items-center gap-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="lucide lucide-calendar"
                                  >
                                    <path d="M8 2v4" />
                                    <path d="M16 2v4" />
                                    <rect
                                      width="18"
                                      height="18"
                                      x="3"
                                      y="4"
                                      rx="2"
                                    />
                                    <path d="M3 10h18" />
                                  </svg>
                                  {new Date(
                                    concert.Schedule[
                                      concert.Schedule.length - 1
                                    ].date
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-gray-500">
                            No schedule available
                          </div>
                        )}
                      </div>
                      <div className="flex items-end">
                        <NavLink
                          to={`/concert/${concert.id}`}
                          className="flex justify-center w-full mt-3 text-blue-500 py-2 px-4 text-center gap-1 border-transparent hover:border-blue-500 hover:border-b-2 hover:pb-[5px] rounded-lg transition-all duration-200"
                        >
                          ดูรายละเอียด
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">
                ไม่พบคอนเสิร์ตที่ตรงกับการค้นหา
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
