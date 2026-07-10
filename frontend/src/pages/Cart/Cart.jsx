import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../components/Context/StoreContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { food_list, cartItems, removeFromCart, getTotalCartAmount } = useContext(StoreContext);

  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image.url} alt="" />
                  <p>{item.name}</p>
                  <p>&#8377;{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>&#8377;{item.price * cartItems[item._id]}</p>
                  <p onClick={()=> removeFromCart(item._id)} className="cross">x</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className="cart-bottom">
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
            <button onClick={()=> navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
            <div>
                <p>Do you have any promo code?</p>
                <div className="cart-promocode-input">
                    <input type="text" placeholder="promo code"/>
                    <button>Submit</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
