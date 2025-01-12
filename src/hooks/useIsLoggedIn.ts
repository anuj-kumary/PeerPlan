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
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUserData: User = JSON.parse(userData);
          setIsLoggedIn(true);
          setUserInfo(parsedUserData);
        } else {
          setIsLoggedIn(false);
          setUserInfo(undefined);
        }
      } catch (error) {
        console.error('Error parsing user:', error);
        setIsLoggedIn(false);
        setUserInfo(undefined);
      } finally {
        setLoading(false);
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

  return {isLoggedIn,userInfo,loading};
};

export default useIsLoggedIn;
