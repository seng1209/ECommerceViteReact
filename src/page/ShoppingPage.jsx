import { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import Header2 from "../components/Header2";
import Cart from "../components/Cart";
import Breadcrumb from "../components/Breadcrumb";
import { useCart } from "../context/CartContext";
import PayPayButton from "../paypal/PayPalButton";
import { jwtDecode } from "jwt-decode";

const ShoppingPage = () => {
  const token = localStorage.getItem("token");

  const decode = jwtDecode(token);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const cities = [
    "Phnom Penh",
    "Banteay Meanchey",
    "Battambang",
    "Kampong Cham",
    "Kampong Chhnang",
    "Kampong Speu",
    "Kampong Thom",
    "Kampot",
    "Kandal",
    "Koh Kong",
    "Kep",
    "Kratíe",
    "Mondulkiri",
    "Oddar Meanchey",
    "Pailin",
    "Preah Sihanouk",
    "Preah Vihear",
    "Pursat",
    "Prey Veng",
    "Ratanakiri",
    "Siem Reap",
    "Stung Treng",
    "Svay Rieng",
    "Takéo",
    "Tbong Khmum",
  ];

  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    getTotalPrice,
    removeFromCart,
  } = useCart();

  const [order, setOrder] = useState([]);
  const [orderProduct, setOrderProduct] = useState([]);
  const [shipment, setShipment] = useState([]);
  const [payment, setPayment] = useState([]);
  let user_id = decode.sub;

  const [shipmentMethods, setShipmentMethods] = useState([]);

  const [shipmentMethod, setShipmentMethod] = useState();

  const [shipmentPrice, setShipmentPrice] = useState(0);

  const handleShipment = (e) => {
    setShipment({ ...shipment, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  const getShipmentMethods = async () => {
    try {
      const results = await axios.get(
        import.meta.env.VITE_API_BASE + `shipment_methods`,
        config
      );
      setShipmentMethods(results.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getShipmentPrice = async (shipment_method_id) => {
    try {
      const result = await axios.get(
        import.meta.env.VITE_API_BASE +
          `shipment_methods/id/${shipment_method_id}`,
        config
      );
      setShipmentPrice(result.data.data.price);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getShipmentMethods();
  }, []);

  const process = async () => {
    try {
      const orderDto = {
        ...order,
        user_id: user_id,
        total_amount: getTotalPrice(),
      };
      const orderResponse = await axios.post(
        import.meta.env.VITE_API_BASE + `orders`,
        orderDto,
        config
      );
      // console.log(orderDto);
      let orderProductDto = "";
      await cartItems.forEach((item) => {
        orderProductDto = {
          ...orderProduct,
          order_id: orderResponse.data.data.order_id,
          product_id: item.product_id,
          quantity: item.quantity,
          amount: Number(item.quantity) * Number(item.price),
        };
        // console.log(orderProductDto);
        axios.post(
          import.meta.env.VITE_API_BASE + `order-details`,
          orderProductDto,
          config
        );
      });
      const shipmentDto = {
        ...shipment,
        user_id: user_id,
        order_id: orderResponse.data.data.order_id,
      };
      // console.log(shipmentDto);
      const shipemntResponse = await axios.post(
        import.meta.env.VITE_API_BASE + `shipments`,
        shipmentDto,
        config
      );
      // console.log(shipemntResponse);
      // getShipmentPrice(1);
      const paymentDto = {
        ...payment,
        payment_method_id: 1,
        order_id: orderResponse.data.data.order_id,
        amount: getTotalPrice(),
      };
      // console.log(paymentDto);
      const paymentResponse = await axios.post(
        import.meta.env.VITE_API_BASE + `payments`,
        paymentDto,
        config
      );
      setTimeout(function () {
        localStorage.removeItem("cartItems");
        window.location.href = "/";
      }, 500);
    } catch (error) {
      if (error.response) {
        console.log("Error Response: " + error.response.data);
        error.response.data.forEach((err) => {
          console.log("error: " + err);
        });
        console.log("Status Code: " + error.response.status);
      } else {
        console.log("Error: " + error.message);
      }
    }
  };

  return (
    <>
      <Header2 />
      <Cart />
      <Breadcrumb />
      {/* Shoping Cart */}
      <form className="bg0 p-t-75 p-b-85">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
              <div className="m-l-25 m-r--38 m-lr-0-xl">
                <div className="wrap-table-shopping-cart">
                  <table className="table-shopping-cart">
                    <tbody>
                      {/* <thead> */}
                      <tr className="table_head">
                        <th className="column-1">Product</th>
                        <th className="column-2" />
                        <th className="column-3">Price</th>
                        <th className="column-4">Quantity</th>
                        <th className="column-5">Remove</th>
                      </tr>
                      {/* </thead> */}
                      {/* <tbody> */}
                      {cartItems.length === 0 ? (
                        <p>Your cart is empty</p>
                      ) : (
                        <>
                          {cartItems?.map((item) => {
                            return (
                              <tr className="table_row" key={item.product_id}>
                                <td className="column-1">
                                  <div className="how-itemcart1">
                                    <img src={item.image} alt={item.image} />
                                  </div>
                                </td>
                                <td className="column-2">
                                  {item.product_name}
                                </td>
                                <td className="column-3">$ {item.price}</td>
                                <td className="column-4">
                                  <div className="wrap-num-product flex-w m-l-auto m-r-0">
                                    <div
                                      className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                                      onClick={() =>
                                        decrementQuantity(item.product_id)
                                      }
                                      disabled={item.quantity <= 1}
                                    >
                                      <i className="fs-16 zmdi zmdi-minus" />
                                    </div>
                                    <input
                                      className="mtext-104 cl3 txt-center num-product"
                                      type="number"
                                      name="num-product1"
                                      value={item.quantity}
                                      min={1}
                                    />
                                    <div
                                      className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                      onClick={() =>
                                        incrementQuantity(item.product_id)
                                      }
                                    >
                                      <i className="fs-16 zmdi zmdi-plus" />
                                    </div>
                                  </div>
                                </td>
                                <td className="column-5">
                                  <div
                                    // className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                    onClick={() => removeFromCart(item)}
                                  >
                                    <i className="zmdi zmdi-close"></i>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                  <div className="flex-w flex-m m-r-20 m-tb-5">
                    <input
                      className="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5"
                      type="text"
                      name="coupon"
                      placeholder="Coupon Code"
                    />
                    <div className="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5">
                      Apply coupon
                    </div>
                  </div>
                  <div className="flex-c-m stext-101 cl2 size-119 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10">
                    Update Cart
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
              <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                <h4 className="mtext-109 cl2 p-b-30">Cart Totals</h4>
                <div className="flex-w flex-t bor12 p-b-13">
                  <div className="size-208">
                    <span className="stext-110 cl2"> Subtotal: </span>
                  </div>
                  <div className="size-209">
                    <span className="mtext-110 cl2">
                      {" "}
                      $ {getTotalPrice().toFixed(2)}{" "}
                    </span>
                  </div>
                </div>
                <div className="flex-w flex-t bor12 p-t-15 p-b-30">
                  <div className="size-208 w-full-ssm">
                    <span className="stext-110 cl2"> Shipping: </span>
                  </div>
                  <div className="size-209 p-r-18 p-r-0-sm w-full-ssm">
                    <div className="p-t-15">
                      <span className="stext-112 cl8">
                        {" "}
                        Calculate Shipping{" "}
                      </span>
                      <div className="rs1-select2 rs2-select2 bor8 bg0 m-b-12 m-t-9">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          name="city"
                          onChange={(e) => handleShipment(e)}
                        >
                          <option selected="">City</option>
                          {cities?.map((city) => {
                            return <option value={city}>{city}</option>;
                          })}
                        </select>

                        <div className="dropDownSelect2" />
                      </div>
                      <div className="bor8 bg0 m-b-12">
                        <input
                          className="stext-111 cl8 plh3 size-111 p-lr-15"
                          type="text"
                          name="street_address"
                          placeholder="State /  country"
                          onChange={(e) => handleShipment(e)}
                        />
                      </div>
                      <div className="rs1-select2 rs2-select2 bor8 bg0 m-b-12 m-t-9">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          name="shipment_method_id"
                          onChange={(e) => handleShipment(e)}
                        >
                          <option selected="">Shipment Methods</option>
                          {shipmentMethods?.map((obj) => {
                            return (
                              <option value={obj.shipment_method_id}>
                                {obj.name}
                              </option>
                            );
                          })}
                        </select>

                        <div className="dropDownSelect2" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-w flex-t p-t-27 p-b-33">
                  <div className="size-208">
                    <span className="mtext-101 cl2"> Total: </span>
                  </div>
                  <div className="size-209 p-t-1">
                    <span className="mtext-110 cl2"> ${getTotalPrice()}</span>
                  </div>
                </div>
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
                              value: getTotalPrice(),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        alert(
                          `Transaction completed by ${details.payer.name.given_name}`
                        );

                        process();

                        // setTimeout(function () {
                        //   localStorage.removeItem("cartItems");
                        //   window.location.href = "/";
                        // }, 3000);
                      });
                    }}
                  />
                </PayPalScriptProvider>
                {/* <PayPayButton subtotal={getTotalPrice().toFixed(2)} /> */}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ShoppingPage;
