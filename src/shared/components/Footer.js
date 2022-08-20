import {
    faFacebookSquare,
    faInstagramSquare,
    faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.css";

export default function Footer() {
    return (
        <div className="footer--container">
            <div className="footer--top--container">
                <div className="footer--top--left--container">
                    <h5>SANTORINIS</h5>
                    <h6>Copyright © 2022. LogoIpsum. All rights</h6>
                </div>
                <div className="footer--top--right--left--container">
                    <h3>Services</h3>
                    <h5>Email Marketing</h5>
                    <h5>Campaigns</h5>
                    <h5>Branding</h5>
                    <h5>Offline</h5>
                </div>
                <div className="footer--top--right--right--container">
                    <h3>About</h3>
                    <h5>Our Story</h5>
                    <h5>Benefits</h5>
                    <h5>Team</h5>
                    <h5>Careers</h5>
                </div>
            </div>
            <div className="footer--bottom--container">
                <a href="https://www.facebook.com">
                    <FontAwesomeIcon icon={faFacebookSquare} />
                </a>
                <a href="https://www.instagram.com">
                    <FontAwesomeIcon icon={faInstagramSquare} />
                </a>
                <a href="https://www.twitter.com">
                    <FontAwesomeIcon icon={faTwitterSquare} />
                </a>
            </div>
        </div>
    );
}
