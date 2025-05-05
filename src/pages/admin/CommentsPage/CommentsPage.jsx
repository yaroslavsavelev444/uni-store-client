import React, { useEffect } from 'react';
import { productStore, store } from '../../../main';
import Empty from '../../../components/Empty/Empty';
import ReviewItem from '../../../components/ReviewItem/ReviewItem';
import { observer } from 'mobx-react-lite';
import { Loader } from 'lucide-react';
import BackBtn from '../../../components/BackBtn/BackBtn';

const CommentsPage = function () {
  useEffect(() => {
    productStore.fetchOrgReviews();
  }, []);

  const handleUpdateCommentStatus = async (commentId, status) => {
      await productStore.updateCommentStatus(commentId, status);
  };

  if(productStore.isLoading){
    return <Loader size={50}/>
  }

  return (
    <div>
       <BackBtn />
      {productStore?.comments.length === 0 ? (
        <Empty text="Новых комментариев нет" />
      ) : (
        productStore?.comments.map((comment) => (
          <ReviewItem
            key={comment._id}
            review={comment}
            isEditable={store?.user?.role === 'admin' || store?.user?.role === 'superadmin'}
            onChange={handleUpdateCommentStatus}
          />
        ))
      )}
    </div>
  );
};

export default observer(CommentsPage);