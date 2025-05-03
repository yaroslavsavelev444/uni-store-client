import React from "react";
import './CompanyItem.css';
import { API_URL } from "../../http/axios";

const CompanyItem = ({ company, onClick}) => {
  return (
    <div className="company-item" onClick={() => onClick(company)}>
      <img src={`${API_URL}/${company.logo}`} alt="Logo" className="company-logo" />
      <p className="company-name">{company.companyName}</p>
      <p className="company-address">{company.address}</p>
      <p className="company-phone">{company.phone}</p>

    </div>
  );
};

export default CompanyItem;