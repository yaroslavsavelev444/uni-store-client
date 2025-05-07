import React from 'react'
import { API_URL } from '../../http/axios'
import './SocialItem.css'
export default function SocialItem({link}) {
  return (
    <a href={link.url} className='block-background social-item'>
     <img src={`${API_URL}${link.icon}`} alt="icon"/>
    </a>
  )
}
