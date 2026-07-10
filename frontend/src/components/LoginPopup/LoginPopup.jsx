import { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import {StoreContext} from '../Context/StoreContext.jsx'
import axios from 'axios'

export default function LoginPopup({setShowLogin}){
    const [currState, setCurrState] = useState("Sign Up");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const {url, setToken} = useContext(StoreContext);

    const handleInputChange = (e) => {
        e.preventDefault();

        setData((prev) => ({...prev, [e.target.name] : e.target.value}));
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;

        if(currState === "Sign Up") {
            newUrl += "/api/user/register";
        } else {
            newUrl += "/api/user/login";
        }
        const response = await axios.post(newUrl, data);
        
        if(response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        }
        else{
            alert(response.data.message);
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={()=> setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>

                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input onChange={handleInputChange} type="text" placeholder='Your Name' name='name' value={data.name}  required/>}
                    <input onChange={handleInputChange} type="email" placeholder='Your Email' name='email' value={data.email} required/>
                    <input onChange={handleInputChange} type="password" placeholder='Password' name='password' value={data.password} required/>
                </div>

                <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>

                <div className="login-popup-condition">
                    <input type="checkbox" required/>
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {currState === "Login"
                ? <p>Create a new account? <span onClick={()=> setCurrState("Sign Up")}>Click here</span></p>
                : <p>Already have an account? <span onClick={()=> setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}