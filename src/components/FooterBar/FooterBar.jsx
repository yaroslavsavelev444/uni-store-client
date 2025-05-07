import React from "react";
import "./FooterBar.css";
import { observer } from "mobx-react-lite";
import { productStore } from "../../main";
import FileItem from "../FileItem/FileItem";
import SocialItems from "../SocialItem/SocialItems";

const FooterBar = () => {
  return (
    <footer className="block-background footer">
      <div className="footer-top">
        <div className="footer-column">
          <h4>Информация</h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {productStore.company?.files?.length > 0 &&
              productStore.company.files.map((file, index) => (
                <FileItem file={file} index={index} role={"user"} key={index} />
              ))}
          </ul>
        </div>
        <div className="footer-column">
          <h4>Страницы</h4>
          <ul>
            <li>
              <a href="#">Главная</a>
            </li>
            <li>
              <a href="#">Услуги</a>
            </li>
            <li>
              <a href="#">Цены</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Соцсети</h4>
          <SocialItems links={productStore.company.socialLinks} />
        </div>
      </div>

      <div className="footer-bottom">
        <hr />
        <p>© {new Date().getFullYear()} ООО КПБ "Полёт". Все права защищены.</p>
      </div>
    </footer>
  );
};

export default observer(FooterBar);
