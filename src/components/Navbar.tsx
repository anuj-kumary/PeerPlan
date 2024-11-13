import { Menu } from 'lucide-react';
import { useState } from 'react';
import { X } from 'lucide-react';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className=" bg-white shadow-[0_4px_6px_rgba(0,0,0,0.04)] transition-colors fixed top-0 left-0 w-full h-14 flex-row z-50">
                <nav className='flex flex-wrap items-center h-14 justify-between'>
                    <div>
                        <a href='/' className='text-2xl font-medium'>PeerPlan</a>
                    </div>
                    <div className="flex">
                        <a href='/login' className="pr-2 hidden md:block">Sign In</a>
                        <a href='/signup' className="pr-2 hidden md:block">Sign Up</a>

                    </div>
                    <div className={`md:hidden ${isOpen ? 'hidden' : 'block'}`} onClick={toggleMenu}>
                        <Menu cursor='pointer' />
                    </div>
                    {
                        isOpen
                        && <X cursor='pointer' onClick={toggleMenu} />
                    }
                </nav>
            </div >
            <div
                className={`fixed top-14 left-0 h-full w-64 shadow-lg z-40 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-500 ease-in-out`}
            >
                <ul className="flex flex-col p-4">
                    <a href='/login' className="py-2 cursor-pointer">Sign In</a>
                    <a href='/signup' className="py-2 cursor-pointer">Sign Up</a>
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

