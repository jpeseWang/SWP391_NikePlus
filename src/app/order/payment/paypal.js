/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
class PaypalButton extends React.Component {
  render() {
    const { price } = this.props;

    return (
      <PayPalScriptProvider
        options={{
          "client-id":
            "ARYI_H9cVv4NbfslyZ24d3keT4RO0QLs6on2sPS4oNOZoDIE1Gy1i405HflcAP9pwTLNLoM-QDaV01gN",
        }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: price.toString(), // Change this to your desired amount
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(function (details) {
              // Show a success message to the buyer
              toast.success(
                "Transaction completed successfully by " +
                  details.payer.name.given_name +
                  "!"
              );
              redirect("/");
            });
          }}
        />
      </PayPalScriptProvider>
    );
  }
}

export default PaypalButton;