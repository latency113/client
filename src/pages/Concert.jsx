import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import concertService from "../services/Concert.service";
import ConcertCard from "../components/ConcertCard";
import BottomNav from "../components/BottomNav";

const Concert = () => {
  const [concert, setConcert] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    concertService
      .get()
      .then((response) => {
        const concerts = response.data.concerts;
        setConcert([...concerts]); // ทำซ้ำข้อมูล
      })
      .catch((e) => console.log(e));
  }, []);

  // ตรวจจับการเลื่อนและรีเซ็ตตำแหน่ง
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;

        // ถ้าเลื่อนมาถึงซ้ายสุด
        if (scrollLeft <= 0) {
          scrollContainerRef.current.scrollLeft = scrollWidth / 2 - clientWidth;
        }
        // ถ้าเลื่อนไปถึงขวาสุด
        else if (scrollLeft + clientWidth >= scrollWidth) {
          scrollContainerRef.current.scrollLeft = scrollWidth / 2;
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      if (direction === "left") {
        scrollContainerRef.current.scrollBy({
          left: -300,
          behavior: "smooth",
        });
      } else {
        scrollContainerRef.current.scrollBy({
          left: 300,
          behavior: "smooth",
        });
      }
    }
  };
  

  return (
    <>
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="flex justify-center text-center">
          <div className="flex flex-col text-blue-500 font-semibold p-5 container mx-auto">
            <hr />
            <span className=" text-5xl">
              สำรวจคอนเสิร์ตและกิจกรรมที่กำลังจะมาถึง!
            </span>
            <span className="2xl">
              พบกับคอนเสิร์ตและกิจกรรมใหม่ๆ ที่จะมาเติมเต็มความสนุกของคุณ
            </span>
          </div>
        </div>

        {/* ปุ่มลูกศรเลื่อน */}

        <div className="container mx-auto px-4 relative pt-5">
          <div className="mb-10">
            <nav>
              <ul className="flex justify-center bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-md p-1">
                <li className="flex gap-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8" />
                    <path d="M6 10V8" />
                    <path d="M6 14v1" />
                    <path d="M6 19v2" />
                    <rect x="2" y="8" width="20" height="13" rx="2" />
                  </svg>
                  <p className="text-white text-xl">แนะนำสำหรับคุณ</p>
                </li>
              </ul>
            </nav>
          </div>
          {/* ปุ่มเลื่อนซ้าย */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full z-10"
          >
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
              class="lucide lucide-move-left"
            >
              <path d="M6 8L2 12L6 16" />
              <path d="M2 12H22" />
            </svg>
          </button>

          {/* คอนเทนต์เลื่อนแบบแนวนอน */}
          <div
            className="flex gap-6 overflow-x-auto scrollbar-hidden my-4 px-10"
            ref={scrollContainerRef}
            style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
          >
            {concert.map((concert, index) => (
              <div
                key={index}
                className="min-w-[310px] max-w-[300px] flex-shrink-0"
              >
                <ConcertCard {...concert} />
              </div>
            ))}
          </div>

          {/* ปุ่มเลื่อนขวา */}
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full z-10"
          >
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
              class="lucide lucide-move-right"
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M2 12H22" />
            </svg>
          </button>
        </div>

        <div className="container mx-auto px-4 mt-3 py-10">
          <div className="mb-10">
            <nav>
              <ul className="flex gap-3 justify-center bg-gradient-to-r from-rose-400 to-red-500 rounded-md p-1">
                <li className="flex gap-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8" />
                    <path d="M6 10V8" />
                    <path d="M6 14v1" />
                    <path d="M6 19v2" />
                    <rect x="2" y="8" width="20" height="13" rx="2" />
                  </svg>
                  <p className="text-white text-xl">คอนเสิร์ตทั้งหมด</p>
                </li>
              </ul>
            </nav>
          </div>
          {/* Card Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
            {concert.map((concert) => (
              <ConcertCard key={concert.id} {...concert} />
            ))}
          </div>
        </div>
      </div>
      <hr />
      <BottomNav/>
      <Footer />
    </>
  );
};

export default Concert;
