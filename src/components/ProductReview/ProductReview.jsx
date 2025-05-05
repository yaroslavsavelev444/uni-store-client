import React from 'react'
import UserPreview from '../UserPreview/UserPreview'
import './ProductReview.css'
import { formatDate } from '../../utils/formatMessageTime'

export default function ProductReview({ review }) {

  return (
    <div className="product-review">
      <UserPreview user={review.user} />
      <div className="text">{review.text}</div>
      <div className="rating">{review.rating}/5</div>
      <div className="date">{formatDate(review.createdAt)}</div>
    </div>
  )
}