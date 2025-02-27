import React, { useEffect, useState } from "react";
import Navbar from "./../../components/Navbar";
import Footer from "../../components/Footer";
import { useParams,Navigate, useNavigate } from "react-router-dom";
import paymentService from "../../services/payment.service";
import { toast } from "react-toastify";

const CheckoutComplete = () => {
  const { session } = useParams();
  const token = localStorage.getItem("token");
  const [status, setStatus] = useState("");
  const Navigate = useNavigate();
  console.log(session);

  useEffect(() => {
    fetchPayment();
  }, []);

  const fetchPayment = async () => {
    try {
      const res = await paymentService.checkoutstatus(token, session);
      setStatus(res.data.status);
      toast.success("ชำระเงินสำเร็จ");
      Navigate("/user/tickets")
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "open") {
    return (navigator.href = "https://conhub-iokd.onrender.com/");
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <br />
        <div className="container mx-auto">
          <hr />
          <div className="flex justify-center">CheckoutComplete</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutComplete;
