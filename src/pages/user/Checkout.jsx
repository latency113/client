import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import paymentService from "./../../services/payment.service";
import { useParams } from "react-router-dom";
import Navbar from "./../../components/Navbar";
import Footer from "./../../components/Footer";
import BottomNav from "../../components/BottomNav";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const fetchClientSecret = async () => {
    try {
      const res = await paymentService.checkout(token, id);
      return res.data.clientSecret;
    } catch (error) {}
  };

  const options = { fetchClientSecret };
  return (
    <>
      <Navbar />
      <hr />
      <div className="">
        <div className="">
          <hr />
          <h1 className="text-center text-2xl">ชำระเงิน</h1>
          <div id="checkout">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </div>
      </div>
      <hr />
      <BottomNav/>
      <Footer />
    </>
  );
};

export default Checkout;
