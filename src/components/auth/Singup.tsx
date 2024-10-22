import { useState } from 'react'
import { loginWithGoogle } from '../../rest/auth';
import GoogleIcon from '../Icons/GoogleIcon';

export const Singup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log({ email, password });
    };

    return (
        <div className="min-h-screen relative z-0 flex w-full">
            {/* Right Side: Image slider*/}
            <div className="hidden md:flex w-1/2 bg-blue-500 items-center justify-center">
                <div className="text-white text-4xl font-bold animate-bounce">
                    Welcome To The PeerPlan!
                </div>
            </div>
            {/* Left Side: Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-gray-100">
                <h2 className="text-3xl font-light mb-3">Hello Peer!</h2>
                <h5>Connect with your peers and start building something amazing</h5>
                <form onSubmit={handleSubmit} className="w-full mt-6 max-w-sm">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Signup
                    </button>
                    <p className='text-center'>Already have a account? <a href="/login" className="text-blue-500">Login</a></p>
                    <button
                        type="submit"
                        className="w-full mt-3 border py-3 rounded-lg text-black font-light flex items-center justify-center space-x-2 transition-colors"
                        onClick={loginWithGoogle}
                    >
                        <GoogleIcon />
                        <span>Sign up with Google</span>
                    </button>

                </form>
            </div>
        </div>
    )
}

