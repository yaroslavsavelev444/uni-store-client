export const themeOptions = [
    {
        label: 'Цена',
        value: 'price',
    },
    {
        label: 'Качество товара',
        value: 'quality',
    },
    {
        label: 'Работа компании',
        value: 'company',
    },
    {
        label: 'Доставка',
        value: 'delivery',
    },
    {
        label: 'Другое',
        value: 'other',
    },
]

export const faqData = [
    {
      question: 'Какие сроки доставки?',
      answer: 'Обычно от 2 до 5 рабочих дней по России.',
    },
    {
      question: 'Можно ли отслеживать доставку?',
      answer: 'Да, вы получите трек-номер сразу после отправки.',
    },
    {
      question: 'Есть ли возможность срочной доставки?',
      answer: 'Да, доступна за дополнительную плату в зависимости от региона.',
    },
  ];

  export const deliveryOptions = [
    {
      label: 'CDEK',
      value: 'cdek',
    },
    {
      label: 'Почта России',
      value: 'post',
    },
  ];

  export const deliveryVariants = [
    {
      label: 'Доставка',
      value: 'delivery',
    },
    {
      label: 'Самовывоз',
      value: 'pickup',
    },
  ];

  export function getStatusClass(status) {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'packed': return 'status-packed';
      case 'sent': return 'status-sent';
      case 'cancelled': return 'status-cancelled';
      case 'rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  }
  
  export function statusLabel(status) {
    const map = {
      pending: 'В ожидании',
      confirmed: 'Подтвержден',
      rejected: 'Отклонён',
      packed: 'Упакован',
      sent: 'Отправлен',
      cancelled: 'Отменён',
      ready : 'Готов к выдаче',
      wait : 'Ожидание оплаты',
    };
    return map[status] || status;
  }

export const orderDeliveryStatusOptions = [
  {
    label: 'Подтвержден',
    value: 'accepted',
  },
  {
    label: 'Сборка',
    value: 'packed',
  },
  {
    label: 'Ожидание оплаты',
    value: 'waiting',
  },
  {
    label: 'Отправлен',
    value: 'sent',
  },
];

export const orderPickupStatusOptions = [
  {
    label: 'Подтвержден',
    value: 'accepted',
  },
  {
    label: 'Сборка',
    value: 'packed',
  },
  {
    label: 'Готов к выдаче',
    value: 'ready',
  },
];

export const reviewStatus = [
  {
    label: 'Подтвержден',
    value: 'active',
  },
  {
    label: 'Отклонён',
    value: 'reject',
  },
  {
    label: 'В ожидании',
    value: 'pending',
  },
];

export const rolesTranslate = {
  admin: 'Администратор',
  superadmin: 'Суперадмин',
  user: 'Пользователь',
};

export const commentThemeTranslate = {
  company: 'Работа организации',
  delivery: 'Доставка',
  other: 'Другое',
  price: 'Цена',
  quality: 'Качество товара',
};
