import React from "react";
import "./FooterBar.css";
import FooterIcon from "../FooterIcon/FooterIcon";
import { FaTelegram, FaVk, FaYoutube } from "react-icons/fa";

const FooterBar = () => {

  return (
    <footer className="block-background footer">
      <div className="footer-content">
        <div className="footer-body footer-uni">
          <div className="footer-body-content">
            <div className="footer-hrefs">
              <h3>Lorem, ipsum.</h3>
            </div>

            <div className="footer-docs">
              <p>Связаться с нами</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom footer-uni">
          <div className="footer-bottom-links">
            <FooterIcon icon={<FaVk size={30} />} />
            <FooterIcon icon={<FaTelegram size={30} />} />
            <FooterIcon icon={<FaYoutube size={30} />} />
          </div>
        </div>

        <div className="footer-footer">
          <div className="footer-footer-content">
            <p>Copyright ©{new Date().getFullYear()} Сервис. Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;