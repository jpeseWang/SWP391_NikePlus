/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CreateOrder } from "@/services/orderService";
import CommonUtil from "@/common/commonUtils";
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentStatus: null,
    };
  }

  render() {
    const { price, onPaymentSuccess } = this.props;
    const { paymentStatus } = this.state;

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
                    value: price.toString(),
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              // Show a success message to the buyer
              toast.success(
                "Transaction completed successfully by " +
                  details.payer.name.given_name +
                  "!",
              );
              this.setState({ paymentStatus: "success" });
              if (onPaymentSuccess) {
                onPaymentSuccess(details);
              }
            });
          }}
          onError={(err) => {
            toast.error("Transaction failed. Please try again.");
            this.setState({ paymentStatus: "error" });
          }}
          onCancel={() => {
            toast.error("Transaction canceled.");
            this.setState({ paymentStatus: "canceled" });
          }}
        />
      </PayPalScriptProvider>
    );
  }
}

export default function PaypalButtonWrapper({ price }) {
  const router = useRouter();

  const handlePaymentSuccess = (details) => {
    const orderData = CommonUtil.getStorageValue("orderDataLs", {});
    const updatedOrderData = {
      ...orderData,
      orderInfo: {
        ...orderData.orderInfo,
        paymentStatus: "Paid",
      },
    };
    CreateOrder(updatedOrderData);
    router.push("/order/summary");
  };

  return <PaypalButton price={price} onPaymentSuccess={handlePaymentSuccess} />;
}
