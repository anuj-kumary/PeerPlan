import { useEffect, useState } from 'react'
import { getUser, logoutUser } from '../../rest/auth'
import { useNavigate } from 'react-router-dom';

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


function Profile() {
    const [user, setUser] = useState<User | undefined>(undefined)
    const navigate = useNavigate()
    const handleLogout = async () => {
        localStorage.removeItem('userSession')
        await logoutUser()
        navigate("/")
    }

    useEffect(() => {
        const checkUser = async () => {
            try {
                const userData = await getUser()
                console.log(userData, "userData")
                setUser(userData)
            } catch (error) {
                setUser(undefined)
                console.log(error)
            }
        }

        checkUser()
    }, [])
    return (
        <div className='flex justify-between w-full'>
            <h3>{user?.name}</h3>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Profile
