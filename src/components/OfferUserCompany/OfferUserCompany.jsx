import React from 'react'
import './OfferUserCompany.css'
import { Check, X } from 'lucide-react';
import { log } from '../../utils/logger';
export default function OfferUserCompany({company, onSelect, selected, onCancelSelection}) {
    log("company", company);
    const handleCancelSelection = (e) => {
        e.stopPropagation(); // ⬅️ ВАЖНО: останавливает всплытие
        onCancelSelection();
      };
    return (
        <div className={`block-background company-card ${selected ? "company-card-selected" : ""}`} >
          <span className="company-name">{company?.companyName || "Нет названия"}</span>
          <span className="company-inn">ИНН: {company?.inn || "Нет ИНН"}</span>
          <span className="company-address">{company?.legalAddress || "Нет адреса"}</span>
          <Check color='green' size={20} onClick={() => onSelect(company)} style={{cursor: 'pointer', }} />
          <X color='red' size={20} onClick={handleCancelSelection} style={{cursor: 'pointer', }}/>
        </div>
      );
}
