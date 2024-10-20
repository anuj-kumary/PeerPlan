import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
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

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const getLoggedInUser = async () => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUserData = JSON.parse(userData)
            setLoggedInUser(parsedUserData)
        }
    }
    useEffect(() => {
        getLoggedInUser()
    }, [navigate])

    console.log(loggedInUser?.name, "loggedInUser")

    return (
        <>
            <nav className="p-2 shadow-lg fixed top-0 left-0 w-full flex h-14 flex-row justify-between items-center z-50">
                <div>
                    <a href='/' className='text-2xl font-medium'>PeerPlan</a>
                </div>
                <div className="flex">
                    <a href='/' className="pr-2 hidden md:block">Home</a>
                    <li className="pr-2 hidden md:block">Connection</li>
                    <li className="pr-2 hidden md:block">Profile</li>
                    <a href='/login' className="pr-2 cursor-pointer hidden md:block">{loggedInUser?.name || "Login"}</a>
                </div>
                <div className={`md:hidden ${isOpen ? 'hidden' : 'block'}`} onClick={toggleMenu}>
                    <Menu cursor='pointer' />
                </div>
                {
                    isOpen
                    && <X cursor='pointer' onClick={toggleMenu} />
                }
            </nav >
            <div
                className={`fixed top-14 left-0 h-full w-64 shadow-lg z-40 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-500 ease-in-out`}
            >
                <ul className="flex flex-col p-4">
                    <a href='/' className="py-2">Home</a>
                    <li className="py-2">Connection</li>
                    <li className="py-2">Profile</li>
                    <a href='/login' className="py-2 cursor-pointer">{loggedInUser?.name || "Login"}</a>
                </ul>
            </div>

            {isOpen && (
                <div
                    className="fixed bg-white inset-0 opacity-50 z-30"
                    onClick={toggleMenu}
                ></div>
            )}
        </>


    );
};

