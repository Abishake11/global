
import './footer.css';
import logo from "./assets/got.logo.png";

import { Link } from "react-router-dom";

import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";


function Footer(){
        return(
            <>
              <footer className="space">
                <div className="container">
                   <div className="row">
                    <div className="col-md-4">
                          <img src={logo} alt="" width="80px" />
                         <p>
                           Welcome to GLOBAL ONLINE TUITION Platforms.
                           You have come to the site where you can avail of the benefits of learning all subjects.</p>
                    </div>

                    <div className="col-md-4">
                        <h5>Social Media</h5>
                        <ul>
                            <li><FaInstagram/><Link to="/">Instagram</Link></li>
                            <li><FaLinkedin/><Link to="/">LinkedIn</Link></li>
                            <li> <FaSquareXTwitter/><Link to="/">Twitter</Link></li>
                            <li><FaSquareWhatsapp/><Link to="/">Whatsapp</Link></li>
                            <li><FaFacebookSquare/><Link to="/">Facebook</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-4">
                         <h5>Contact us</h5>
                         <p className='gm'>globaltuition@gmail.com</p>
                         <p>91+ 8754774013</p>
                        
                    </div>
                   </div>
                </div>
              </footer>
            </>
        )
}

export default Footer