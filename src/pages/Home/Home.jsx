import React from 'react'
import ContentBlock from '../../components/UploadedMaterial/UploadedMaterial'
import PageHeader from '../../components/PageHeader/PageHeader'
import ProductShell from '../../components/ProductShell/ProductShell'
import PromoBlock from '../../components/PromoBlock/PromoBlock'
import FAQSection from '../../components/FAQSection/FAQSection'

export default function Home() {
  return (
    <div className="">
      {/* <ContentBlock /> */}
      <PromoBlock
        title="При заказе от 3 товаров"
        subtitle="Скидка 10%"
        image="/promo/complect.png"
        productId="1"
        reversed
      />
      <PageHeader title="Популярные товары" />
        <ProductShell showOnMainPage={true}/>
      <FAQSection />
    </div>
  )
}
