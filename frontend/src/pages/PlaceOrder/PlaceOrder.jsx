import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../components/Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder() {

    const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext);
    const navigate = useNavigate();

    const [data, setData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
      phone: ""
    });

    const handleInputChange = (e) => {
      setData((data) => ({
        ...data,
        [e.target.name]: e.target.value
      }));
    }

    const placeOrder = async (e) => {
      e.preventDefault();

      let orderItems = [];
      food_list.map((item) => {
        if(cartItems[item._id] > 0){
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      });

      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 55,
      }

      let response = await axios.post(url + "/api/order/place", orderData, {headers: {token}});
      if(response.data.success) {
        const {session_url} = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error");
      }
    }

    useEffect(()=>{
      if(!token){
        navigate("/cart");
      } else if(getTotalCartAmount() === 0){
        navigate("/cart");
      }
    }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input onChange={handleInputChange} name="firstName" type="text" value={data.firstName} placeholder="First name" required/>
          <input onChange={handleInputChange} name="lastName" type="text" value={data.lastName} placeholder="Last name" required/>
        </div>

        <input onChange={handleInputChange} name="email" type="email" value={data.email} placeholder="Email address" required/>
        <input onChange={handleInputChange} name="street" type="text" value={data.street} placeholder="Street" required/>

        <div className="multi-fields">
          <input onChange={handleInputChange} name="city" type="text" value={data.city} placeholder="City" required/>
          <input onChange={handleInputChange} name="state" type="text" value={data.state} placeholder="State" required/>
        </div>

        <div className="multi-fields">
          <input onChange={handleInputChange} name="pinCode" value={data.pinCode} type="text" placeholder="Pin code" required/>
          <input onChange={handleInputChange} name="country" value={data.country} type="text" placeholder="Country" required/>
        </div>

        <input onChange={handleInputChange} name="phone" value={data.phone} type="text" placeholder="Phone" required/>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>&#8377;{getTotalCartAmount()}</p>
            </div>

            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>&#8377;{getTotalCartAmount() === 0 ? 0 : 55}</p>
            </div>

            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>&#8377;{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 55}</p>
            </div>
          </div>

          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}
