import './Header.css'

export default function Header(){
    return (
        <div className='header'>
            <div className="header-contents">
                <h2>Order your favorite food here</h2>
                <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                <button><a href="#explore-menu">View Menu</a></button>
            </div>
        </div>
    )
}