import React from 'react'
import ContactForm from '../../components/ContactForm/ContactForm'
import { productStore } from '../../main'
import YandexMap from '../../components/YMap/YMap'
import PageHeader from '../../components/PageHeader/PageHeader'

export default function Contacts() {
  return (
    <div>
      <ContactForm  phone={productStore?.company?.phone} email={productStore?.company?.email} />
      <PageHeader title="Мы на карте" />
      <YandexMap />
    </div>
  )
}
