import './Navbar.css'
import { assets } from '../../assets/assets'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios';

export default function Navbar({setShowLogin}){
    const [menu, SetMenu] = useState("Home");
    const {getTotalCartAmount, token, setToken, url} = useContext(StoreContext);
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    const handleClick = (e)=>{
        SetMenu(e.target.innerText);
    }

    const logout = ()=> {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }

    const fetchUser = async ()=>{
        let response = await axios.post(url + "/api/user/profile", {}, {headers: {token}});
        if(response.data.success) {
            setUser(response.data.user);
        }
    }

    useEffect(()=>{
        if(token){
            fetchUser();
        }
    }, [token]);

    return(
        <div className='navbar'>
            <Link to='/'><img src={assets.app_logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={handleClick} className={menu === "Home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={handleClick} className={menu === "Menu" ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={handleClick} className={menu === "Mobile App" ? "active" : ""}>Mobile App</a>
                <a href='#footer' onClick={handleClick} className={menu === "Contact Us" ? "active" : ""}>Contact Us</a>
            </ul>
            <div className="navbar-right">
                <img className='navbar-search-icon' src={assets.search_icon} alt="" />
                <div className="navbar-basket-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() ? "dot" : ""}></div>
                </div>
                {!token
                    ? <button onClick={()=> setShowLogin(true)}>Sign In</button>
                    : <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <span className="navbar-username">
                            {user?.name?.toUpperCase()}
                        </span>
                        <ul className="navbar-profile-dropdown">
                            <li onClick={()=> navigate("/myOrders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>
                    }
            </div>
        </div>
    )
}