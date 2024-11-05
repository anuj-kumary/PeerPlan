import { useState } from "react";

export const Sidebar = () => {
    const [activeTab, setActiveTab] = useState('home');
    return (
        <aside className="bg-white shadow-lg hidden md:flex md:flex-col w-64  text-black flex-col">
            <div className="flex-grow">
                <ul className="mt-4">
                    <li className={`px-4 mb-2 py-2 transition duration-200 ease-in-out  cursor-pointer ${activeTab === 'home' ? 'bg-[#3b58ff] text-white' : 'hover:bg-gray-200'}`}
                        onClick={() => setActiveTab('home')}>
                        <a href="#" className="block">Home</a>
                    </li>
                    <li className={`px-4 mb-2 py-2 transition duration-200 ease-in-out  cursor-pointer ${activeTab === 'connection' ? 'bg-[#3b58ff] text-white' : 'hover:bg-gray-200'}`}
                        onClick={() => setActiveTab('connection')}>
                        <a href="#" className="block">Connection</a>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col mt-auto">
                <ul>
                    <li className={`px-4 mb-2 py-2 transition duration-200 ease-in-out  cursor-pointer ${activeTab === 'profile' ? 'bg-[#3b58ff] text-white' : 'hover:bg-gray-200'}`}
                        onClick={() => setActiveTab('profile')}>
                        <a href="#" className="block">Profile</a>
                    </li>
                    <li className="px-4 transition duration-200 ease-in-out  py-2 hover:bg-gray-700">
                        <a href="#" className="block">Logout</a>
                    </li>
                </ul>
            </div>
        </aside>
    );
};
