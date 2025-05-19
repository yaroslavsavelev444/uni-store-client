import React from 'react'
import ContactForm from '../../components/ContactForm/ContactForm'
import { productStore } from '../../main'
import YandexMap from '../../components/YMap/YMap'
import PageHeader from '../../components/PageHeader/PageHeader'

export default function Contacts() {
  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", width:"100%"}}>
      <ContactForm  phone={productStore?.company?.phone} email={productStore?.company?.email} />
      <PageHeader title="Мы на карте" />
      <YandexMap />
    </div>
  )
}
