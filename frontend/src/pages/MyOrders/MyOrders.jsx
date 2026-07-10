import { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../components/Context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import {useNavigate} from 'react-router-dom'

export default function MyOrders() {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userOrders",
      {},
      { headers: { token } },
    );
    setData(response.data.data);
    // console.log(response.data.data);
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);
  return (
    <>
      {data.length === 0 ? (
        <div className="order-empty">
            <img src={assets.empty_order} alt="No Orders" />
            <h3>No Orders Yet</h3>

            <p>
            Looks like you haven't placed any orders yet.
            Start exploring our delicious menu and enjoy
            your favorite meals.
            </p>

            <button onClick={() => navigate("/")}>
            Order Now
            </button>
        </div>
      ) : (
        <div className="my-orders">
          <h2>My Orders</h2>
          <div className="container">
            {data.map((order, index) => {
              return (
                <div key={index} className="my-orders-order">
                  <img src={assets.parcel_icon} alt="" />
                  <p>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + " , ";
                      }
                    })}
                  </p>
                  <p>&#8377;{order.amount}.00</p>
                  <p>Items: {order.items.length}</p>
                  <p>
                    <span>&#x25cf; </span>
                    <b>{order.status}</b>
                  </p>
                  <button onClick={fetchOrders}>Track Order</button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}