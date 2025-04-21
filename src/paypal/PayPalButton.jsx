// App.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../context/CartContext";

function PayPalButton({ subTotal }) {
  const { cartItems } = useCart();
  const [order, setOrder] = useState([]);
  const [orderProduct, setOrderProduct] = useState([]);
  const [shipment, setShipment] = useState([]);
  const [payment, setPayment] = useState([]);
  const user_id = 1;

  const process = async () => {
    try {
      // const orderDto = {
      //   ...order,
      //   user_id: user_id,
      //   total_amount: Subtotal,
      // };
      // const orderResponse = await axios.post(
      //   import.meta.env.VITE_API_BASE + `orders`,
      //   orderDto
      // );
      // let orderProductDto = "";
      // await cartItems.forEach((item) => {
      //   orderProductDto = {
      //     ...orderProduct,
      //     order_id: orderResponse.data.data.order_id,
      //     product_id: item.product_id,
      //     quantity: item.quantity,
      //     amount: Number(item.quantity) * Number(item.price),
      //   };
      //   axios.post(
      //     import.meta.env.VITE_API_BASE + `order-details`,
      //     orderProductDto
      //   );
      // });
      console.log(subTotal);
      // console.log(totalAmount);
    } catch (error) {
      if (error.response) {
        console.log("Error Response: " + error.response.data);
        console.log("Status Code: " + error.response.status);
      } else {
        console.log("Error: " + error.message);
      }
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "ASap20J61zelC5EsQIkrtwWaNc-j8S4QGoWTIE56nvUGUcgNSM4Hq58Xfpob8h2NShHFIDeK_rcGjyTC",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalAmount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Transaction completed by ${details.payer.name.given_name}`);

            process();

            setTimeout(function () {
              localStorage.removeItem("cartItems");
              window.location.href = "/";
            }, 500);
          });
        }}
      />
    </PayPalScriptProvider>
  );
}

export default PayPalButton;
