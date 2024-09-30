import { Menu } from 'lucide-react';
import { useState } from 'react';
import { X } from 'lucide-react';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="p-2 shadow-lg fixed top-0 left-0 w-full flex h-14 flex-row justify-between items-center z-50">
                <div>
                    <h1 className='text-2xl font-medium'>PeerPlan</h1>
                </div>
                <div className="flex">
                    <li className="pr-2 hidden md:block">Home</li>
                    <li className="pr-2 hidden md:block">Connection</li>
                    <li className="pr-2 hidden md:block">Profile</li>
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
                    <li className="py-2">Home</li>
                    <li className="py-2">Connection</li>
                    <li className="py-2">Profile</li>
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

