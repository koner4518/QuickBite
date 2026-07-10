import { assets } from "../../assets/assets";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="logo" src={assets.app_logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            praesentium sed alias non, asperiores doloribus esse est recusandae
            nihil in ab. Ipsa saepe nobis perspiciatis. Vero, hic id. Eligendi,
            aliquid!
          </p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-123-456-7890</li>
            <li>contact@quickbite.com</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="footer-copyright">Copyright 2026 &copy; QuickBite.com - All Right Reserved.</p>
    </div>
  );
}
