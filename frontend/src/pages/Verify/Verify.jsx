import { useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css'
import { useContext } from 'react';
import { StoreContext } from '../../components/Context/StoreContext';
import axios from 'axios';
import { useEffect } from 'react';

export default function Verify(){

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async (req, res) => {
        const response = await axios.post(url + "/api/order/verify", {success, orderId});
        if(response.data.success) {
            navigate("/myOrders");
        } else {
            navigate("/");
        }
    }

    useEffect(()=>{
        verifyPayment();
    }, []);
    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    )
}