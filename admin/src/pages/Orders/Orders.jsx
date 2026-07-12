import { useState } from 'react'
import './Orders.css'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react';
import {assets} from '../../assets/assets.js'

export default function Orders({url}){

    const [orders, setOrders] = useState([]);

    const fetchOrders = async()=>{
        try {
            const response = await axios.get(url + "/api/order/list");
            if(response.data.success){
                setOrders(response.data.data);
                console.log(response.data.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            if (!error.response) {
                toast.info("Backend is starting. Please wait 30-60 seconds and try again.");
            }
            else {
                toast.error(error.response?.data.message);
                console.log(error.response?.data.message);
            }
        }
    }

    const handleOptionChange = async (event, orderId) => {
        let response = await axios.post(url + "/api/order/status",
            {orderId,
            status: event.target.value}
        );
        if(response.data.success) {
            await fetchOrders();
        } else {
            toast.error(response.data.message);
        }
    }

    useEffect(()=>{
        fetchOrders();
    }, []);
    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className='order-item'>
                        <img src={assets.parcel_icon} alt="" />
                        <div>
                            <p className="order-item-food">
                                {order.items.map((item, index)=>{
                                    if(index === order.items.length - 1){
                                        return item.name + " x " + item.quantity
                                    } else {
                                        return item.name + " x " + item.quantity + " , "
                                    }
                                })}
                            </p>

                            <p className='order-item-name'>{order.address.firstName.toUpperCase() + " " + order.address.lastName.toUpperCase()}</p>
                            <div className="order-item-address">
                                <p>{order.address.street + " , "}</p>
                                <p>{order.address.city + " , " + order.address.state + " , " + order.address.country + " , " + order.address.pinCode}</p>
                            </div>
                            <p className="order-item-phone">{order.address.phone}</p>
                        </div>

                        <p>Items : {order.items.length}</p>
                        <p>&#8377; {order.amount}.00</p>

                        <select onChange={(event)=> handleOptionChange(event, order._id)} value={order.status}>
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out For Delivery">Out For Delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}