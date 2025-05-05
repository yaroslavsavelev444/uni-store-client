import React from 'react'
import './PageHeader.css'
export default function PageHeader({title, children}) {
  return (
    <div className='block-background page-header'>
      <h2>{title}</h2>
      {children}
    </div>
  )
}
