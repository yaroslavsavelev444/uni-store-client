// components/ShipAndPay.js

import React, { useState } from 'react';
import './ShipAndPay.css'; // по желанию вынести стили
import Button from '../../components/Buttons/Button';
import FAQBlock from '../../components/FAQBlock/FAQBlock';
import BackBtn from '../../components/BackBtn/BackBtn';

const TABS = [
  {
    id: 'delivery',
    title: 'Условия доставки',
    infoText: 'Узнайте о вариантах и условиях доставки для вашего региона.',
    image: '/assets/img/neurobasket.png',
    faqs: [
      { question: 'Какие сроки доставки?', answer: 'Сроки зависят от региона, обычно 2–7 дней.' },
      { question: 'Можно ли отслеживать доставку?', answer: 'Да, вы можете наблюдать за статусом заказа в разделе Аккаунт > Заказы.' },
      { question: 'Какие компании занимаются доставкой?', answer: 'Мы работаем с CDEK и Почта России.' },
      { question: 'Есть ли возможность срочной доставки?', answer: 'Да, за дополнительную плату.' },
      { question: 'Можно ли изменить адрес доставки?', answer: 'Да, обратитесь в поддержку до отправки.' },
    ],
  },
  {
    id: 'payment',
    title: 'Способы оплаты',
    infoText: 'Узнайте о вариантах оплаты, которые мы поддерживаем.',
    image: '/assets/img/neurocard_main.png',
    faqs: [
      { question: 'Можно ли оплатить при получении?', answer: 'Да, оплата при получении доступна.' },
      { question: 'Какие способы оплаты поддерживаются?', answer: 'Банковские карты, электронные кошельки, СПБ и оплата по счёту.' },
      { question: 'Можно ли оплатить через СПБ?', answer: 'Да, это поддерживается.' },
      { question: 'Как получить квитанцию об оплате?', answer: 'Она придёт на ваш email после оплаты.' },
    ],
  },
  {
    id: 'returns',
    title: 'Политика возврата',
    infoText: 'Возврат возможен при соблюдении условий, указанных ниже.',
    image: '/assets/img/return_policy.png',
    faqs: [
      { question: 'В течение какого времени можно вернуть товар?', answer: 'В течение 14 дней с момента получения.' },
      { question: 'Какие товары нельзя вернуть?', answer: 'Товары, бывшие в употреблении или с нарушением упаковки.' },
      { question: 'Кто оплачивает обратную доставку?', answer: 'В большинстве случаев — покупатель.' },
    ],
  },
];

export default function ShipAndPay() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="container">
      <BackBtn />

      <div className="tabs">
        {TABS.map((tab) => (
          <Button
            key={tab.id}
            className={`tab-link ${tab.id === activeTab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.title}
          </Button>
        ))}
      </div>

      <div className="tab-content active">
        <h2>{activeTab.title}</h2>
        <div className="info-card-spec faq">
          <div className="info-text">{activeTab.infoText}</div>
        </div>

        <FAQBlock faqs={activeTab.faqs} />
      </div>
    </div>
  );
}