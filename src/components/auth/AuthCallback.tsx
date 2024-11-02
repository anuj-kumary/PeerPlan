import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../rest/auth';
import { Loader } from '../Loader';

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const session = await getUser();

                // Store session data in localStorage (or handle it as needed)
                localStorage.setItem('userSession', JSON.stringify(session));

                // Redirect to the home page
                navigate('/');
            } catch (error) {
                console.error('Error fetching session:', error);
                navigate('/login');
            }
        };

        fetchSession();
    }, [navigate]);

    return <Loader />;
};

export default AuthCallback;
