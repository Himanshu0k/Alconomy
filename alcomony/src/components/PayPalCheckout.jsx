import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalCheckout = () => {
  // Define initial options for PayPal SDK
  const initialOptions = {
    "client-id":
      "AWeBWsbpUiLQhZP-t8vdJhHRo0ZGI7znAxh8UjatYvfMeF-YmlJ5ljYHHtjkBGR_NN3jFhjmrS8waPE5", // Replace with your sandbox or live client ID
    currency: "USD",
    intent: "capture", // capture funds immediately
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="bg-gray-800 min-h-screen flex items-center justify-center">
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          <PayPalButtons
            style={{ layout: "vertical" }}
            // Create an order when the button is clicked
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "10.00", // Replace with the amount to be charged
                    },
                  },
                ],
              });
            }}
            // Finalize the transaction after payer approval
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                alert(
                  "Transaction completed by " + details.payer.name.given_name
                );
                // Optionally, handle post-transaction tasks here.
              });
            }}
            // Optional: handle errors
            onError={(err) => {
              console.error("PayPal Checkout onError", err);
              alert(
                "An error occurred during the payment process. Please try again."
              );
            }}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;
