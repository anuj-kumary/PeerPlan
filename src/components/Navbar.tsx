import { Menu } from 'lucide-react';
import { useState } from 'react';
import { X } from 'lucide-react';
import useIsLoggedIn from '../hooks/useIsLoggedIn';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { isLoggedIn } = useIsLoggedIn();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="p-2 shadow-lg fixed top-0 left-0 w-full flex h-14 flex-row justify-between items-center z-50">
                <div>
                    <a href='/' className='text-2xl font-medium'>PeerPlan</a>
                </div>
                <div className="flex">
                    <a href='/' className="pr-2 hidden md:block">Home</a>
                    <a href='/connection' className="pr-2 hidden md:block">Connection</a>
                    {
                        isLoggedIn ? <a href='/profile' className="pr-2 hidden md:block">Profile</a>
                            :
                            <a href='/login' className="pr-2 cursor-pointer hidden md:block">Login</a>
                    }

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
                    <a href='/connection' className="py-2">Connection</a>
                    {
                        isLoggedIn ? <a href='/profile' className="py-2 cursor-pointer">Profile</a>
                            :
                            <a href='/login' className="py-2 cursor-pointer">Login</a>
                    }
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

