import { useEffect, useState } from 'react'
import { getUser } from '../../rest/auth'

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
        <div>
            <h3>{user?.name}</h3>
        </div>
    )
}

export default Profile
