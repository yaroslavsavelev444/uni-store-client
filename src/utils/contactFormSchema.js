import * as yup from 'yup';

export const contactFormSchema = yup.object().shape({
  user: yup.string().required('Имя обязательно').min(2, 'Слишком короткое имя'),
  email: yup
    .string()
    .email('Некорректный email')
    .required('Email обязателен'),
  phone: yup
    .string()
    .matches(
      /^(\+7|8)\d{10}$/,
      'Телефон должен быть в формате +7XXXXXXXXXX или 8XXXXXXXXXX'
    )
    .required('Телефон обязателен'),
  msg: yup.string().required('Сообщение не может быть пустым'),
});