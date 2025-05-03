import React from 'react'
import ContentBlock from '../../components/UploadedMaterial/UploadedMaterial'
import Slider from '../../components/Slider/Slider'
import ItemsSelection from '../../components/ItemsSelection/ItemsSelection'

export default function Home() {
  return (
    <div>
      <ContentBlock />
      <Slider />
      <ItemsSelection />
    </div>
  )
}
