import { useState, useEffect } from 'react';

type User = {
    $id: string;
    name: string;
    registration: string;
    status: boolean;
    labels: string[];
    passwordUpdate: string;
    email: string;
    phone: string;
    emailVerification: boolean;
    phoneVerification: boolean;
};

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo , setUserInfo] = useState<User | undefined>(undefined)

  useEffect(() => {
    const checkLoginStatus = () => {
      const userData = localStorage.getItem('userSession');
      setIsLoggedIn(!!userData);
      if (userData) {
        const parsedUserData = JSON.parse(userData)
        setUserInfo(parsedUserData)
    }
    };

    checkLoginStatus();

    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return {isLoggedIn,userInfo};
};

export default useIsLoggedIn;
