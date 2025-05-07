import React from 'react'
import Empty from '../Empty/Empty'
import ProductReviewItem from '../ProductReviewItem/ProductReviewItem'
import { adminStore } from '../../main'

export default function ProductReviews({reviews, role}) {

    const handleReviewAction = (id, action) => {
        if(!action){
            console.log("Не передано действие");
            return;
        }
        
        if(role === 'admin' || role === 'superadmin'){
           adminStore.changeReviewStatus(id, action);
        }
    }
  return (
    <div style={{display:"flex", flexDirection:"column", width:"100%", alignItems:"center"}}>
        <h2>Отзывы</h2>
      {reviews?.length === 0 ? (
        <Empty text="Отзывы отсутствуют" />
      ) : (
        <div style={{display:"flex", flexDirection:"column", gap:"20px", justifyContent:"center", alignItems:"center", width:"100%"}}>
          {reviews?.map((review) => (
            <ProductReviewItem key={review._id} review={review} role={role} handleReviewAction={handleReviewAction} />
          ))}
        </div>
      )}
    </div>
  )
}
