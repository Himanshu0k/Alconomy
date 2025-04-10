import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      // Create payment intent on backend
      const { data: clientSecret } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/create-payment-intent`,
        { amount: amount * 100 } // Convert to cents
      );

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-gray-800 p-4 rounded-lg">
        <CardElement className="text-white" />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>
    </form>
  );
};

const StripePaymentButton = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const amount = 999; // ₹9.99 in paise

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/save-payment`, {
        paymentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
      });
      alert("Payment successful! Thank you for your purchase.");
    } catch (err) {
      console.error("Error saving payment:", err);
      alert(
        "Payment succeeded but failed to save record. Please contact support."
      );
    }
  };

  return (
    <div className="mt-4">
      {!showPaymentForm ? (
        <button
          onClick={() => setShowPaymentForm(true)}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Upgrade to Premium (₹9.99/month)
        </button>
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={amount} onSuccess={handlePaymentSuccess} />
        </Elements>
      )}
    </div>
  );
};

export default StripePaymentButton;
