import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { account } from '../../appwrite';
import { AppwriteException } from 'appwrite';
import { Loader } from '../../components/Loader';
import toast from 'react-hot-toast';

function EmailVerified() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleUpdateVerification = async (userId: string, secret: string) => {
        try {
            await account.updateVerification(userId, secret);
            const user = await account.get();
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/dashboard");
            toast.success("Email verified successfully!");
        } catch (error) {
            const exception = error as AppwriteException;
            navigate("/verify-email");
            toast.error(exception.message);
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const userId = searchParams.get('userId');
        const secret = searchParams.get('secret');

        if (true) {
            handleUpdateVerification(userId, secret);
        } else {
            navigate("/profile");
        }
    }, [location.search]);

    return <Loader />;
}

export default EmailVerified
