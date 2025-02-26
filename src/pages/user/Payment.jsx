import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import PaymentService from "../../services/payment.service";
import { decodeToken } from "../../auth/auth";
import Navbar from "./../../components/Navbar";
import Footer from "./../../components/Footer";

const stripe = loadStripe(
  "pk_test_51Qviyg2UHAQB7AptSMyclPVUDqqMnhje1NYf4wl6K2SRAkGzcLi15N10an1doMZ2jLacKFl0UoFs2Q4WKwyG0CxG00S2tc4iKv",
  {
    betas: ["custom_checkout_beta_5"],
  }
);

const Payment = () => {
  const token = decodeToken(localStorage.getItem("token"));
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const createCheckoutSession = async (token) => {
      try {
        const response = await PaymentService.payment(token).then((res) => res);
        console.log("Response:", response);
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error creating checkout session:", error);
      }
    };
  }, []);
  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-[150px]">
        <div className="">Payment</div>
      </div>
      ;
      <Footer />
    </>
  );
};

export default Payment;
