import React from 'react';
import { useRouter } from 'next/router'


const useMenu = () => {
  const router = useRouter()

  function movePage(url: string) {
    return router.push(url)
  }

  return {
    movePage
  }
};

export default useMenu;
