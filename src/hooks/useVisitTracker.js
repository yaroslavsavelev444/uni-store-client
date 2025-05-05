import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MAX_VISITS = 10;

export default function useVisitTracker() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const isCategory = /^\/category\/[^/]+$/.test(path);
    const isItem = /^\/category\/[^/]+\/[^/]+$/.test(path);

    if (isCategory || isItem) {
      const visits = JSON.parse(localStorage.getItem('visitTimeline') || '[]');

      const pathParts = path.split('/');
      const categoryId = pathParts[2]; // categoryId будет в третьем элементе
      const itemId = pathParts[3]; // itemId будет в четвёртом элементе (если на странице товара)

      const newVisit = {
        path,
        timestamp: Date.now(),
        label: isItem ? `Товар — ${itemId}` : `Категория — ${categoryId}`,
        categoryId,
        itemId,
      };

      const updated = [newVisit, ...visits.filter(v => v.path !== path)];
      localStorage.setItem('visitTimeline', JSON.stringify(updated.slice(0, MAX_VISITS)));
    }
  }, [location.pathname]);
}