import { useState } from "react";
import { Link } from "react-router-dom";
import Section from "../Section/Section";
import { imageSrc } from "../../constants";
import "./style.scss";

function Footer() {
  const [value, setValue] = useState("");
  return (
    <footer>
      <Section className="container-footer">
        <div className="footer-wrapper">
          <div className="footer-children about-us">
            <div className="footer-children-logo">
              <img
                src={imageSrc.logo}
                alt=""
                width={60}
                height={60}
                style={{ objectFit: "contain" }}
              />
              <img
                src={imageSrc.logoName}
                alt=""
                width={120}
                height={37}
                style={{ objectFit: "cover", marginLeft: 10 }}
              />
            </div>
            <p>
              We are many variations of passages available the majority have
              suffered alteration in some form by injected humour words
              believable.
            </p>
          </div>
          <div className="footer-children footer-menu">
            <h3>MoPlay</h3>
            <ul>
              <li>
                <Link to="/">About Us</Link>
              </li>
              <li>
                <Link to="/">Testimonials</Link>
              </li>
              <li>
                <Link to="/">Contact Us</Link>
              </li>
              <li>
                <Link to="/">Terms Of Service</Link>
              </li>
              <li>
                <Link to="/">Privacy policy</Link>
              </li>
              <li>
                <Link to="/">Update News</Link>
              </li>
            </ul>
          </div>
          <div className="footer-children footer-menu">
            <h3>Genre</h3>
            <ul>
              <li>
                <Link to="/">Action</Link>
              </li>
              <li>
                <Link to="/">Biography</Link>
              </li>
              <li>
                <Link to="/">Documentary</Link>
              </li>
              <li>
                <Link to="/">Adventure</Link>
              </li>
              <li>
                <Link to="/">Talk Show</Link>
              </li>
              <li>
                <Link to="/">Psychological</Link>
              </li>
            </ul>
          </div>
          <div className="footer-children footer-menu">
            <h3>Support</h3>
            <ul>
              <li>
                <Link to="/">Help Center</Link>
              </li>
              <li>
                <Link to="/">FAQ's</Link>
              </li>
              <li>
                <Link to="/">My Account</Link>
              </li>
              <li>
                <Link to="/">Request Movie</Link>
              </li>
              <li>
                <Link to="/">Support</Link>
              </li>
              <li>
                <Link to="/">Media Center</Link>
              </li>
            </ul>
          </div>
          <div className="footer-children about-us">
            <h3>Newsletter</h3>
            <p>Subscribe Our Newsletter To Get Latest Update And News</p>
            <form action="">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                placeholder="Your Email"
              />
              <button>Subscribe Now</button>
            </form>
          </div>
        </div>
      </Section>
    </footer>
  );
}

export default Footer;
