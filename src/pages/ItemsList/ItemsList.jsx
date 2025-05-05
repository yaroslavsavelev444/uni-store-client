import React from "react";
import { observer } from "mobx-react-lite";
import VisitTimeline from "../../components/VisitTimeline/VisitTimeline";
import ProductShell from "../../components/ProductShell/ProductShell";
import { useParams } from "react-router-dom";
import BackBtn from "../../components/BackBtn/BackBtn";

const ItemsList = () => {
  const { categoryId } = useParams(); // получаем categoryId из URL

  return (
    <div>
      <BackBtn />
      <div className="items-list">
        {categoryId === "all" ? (
          <ProductShell />
        ) : (
          <ProductShell categoryId={categoryId} />
        )}
      </div>
    </div>
  );
};

export default observer(ItemsList);
