import { useCallback } from "react";
import { store } from "../main";

export function useAuthAction() {
  const { openAuthModal } = store;

  const checkAuthAndRun = useCallback(
    
    (fn) => {
      if (store.isAuth) {
        fn?.();
      } else {
        openAuthModal();
      }
    },
    [openAuthModal]
  );

  return checkAuthAndRun;
}