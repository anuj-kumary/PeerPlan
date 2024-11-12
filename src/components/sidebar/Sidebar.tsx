import { useState } from "react";
import { Link } from "react-router-dom";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

export const Sidebar = () => {
    const [activeTab, setActiveTab] = useState('home');
    const { isLoggedIn } = useIsLoggedIn();
    return (
        <aside className="bg-white shadow-lg hidden md:flex md:flex-col w-64  text-black flex-col">
            <div className="flex-grow">
                <ul className="mt-4">
                    <li className={`px-4 mb-2 text-lg py-2 transition duration-200 ease-in-out  cursor-pointer hover:bg-gray-200`}
                        onClick={() => setActiveTab('home')}>
                        <Link to="/home" className="block">Peerplan</Link>
                    </li>
                    <li className={`px-4 mb-2 py-2 transition duration-200 ease-in-out  cursor-pointer ${activeTab === 'home' ? 'bg-[#3b58ff] text-white' : 'hover:bg-gray-200'}`}
                        onClick={() => setActiveTab('home')}>
                        <Link to="/home" className="block">Home</Link>
                    </li>
                    <li className={`px-4 mb-2 py-2 transition duration-200 ease-in-out  cursor-pointer ${activeTab === 'connection' ? 'bg-[#3b58ff] text-white' : 'hover:bg-gray-200'}`}
                        onClick={() => setActiveTab('connection')}>
                        <Link to="/connection" className="block">Connection</Link>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col mt-auto">
                <ul>
                    {
                        isLoggedIn &&
                        <><li className={`px-4 mb-2 py-2 transition duration-200 ease-in-out  cursor-pointer ${activeTab === 'profile' ? 'bg-[#3b58ff] text-white' : 'hover:bg-gray-200'}`}
                            onClick={() => setActiveTab('profile')}>
                            <Link to="/profile" className="block">Profile</Link>
                        </li><li className="px-4 transition duration-200 ease-in-out  py-2 hover:bg-gray-700">
                                <a href="#" className="block">Logout</a>
                            </li></>
                    }

                </ul>
            </div>
        </aside>
    );
};
