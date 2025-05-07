import { X } from 'lucide-react';
import React from 'react'

export default function UserCompanyItem({company, onDelete}) {
    return (
        <div className={`block-background company-card`}>
          <span className="company-name">
            {company?.companyName || "Нет названия"}
          </span>
          <span className="company-inn">ИНН: {company?.inn || "Нет ИНН"}</span>
          <span className="company-address">
            {company?.legalAddress || "Нет адреса"}
          </span>
          <X
            color="red"
            size={20}
            onClick={() => onDelete(company._id)}
            style={{ cursor: "pointer" }}
          />
        </div>
      );
}
