import { ChangeEvent, useState } from 'react';
import { emailSignIn, loginWithGoogle } from '../../rest/auth';
import GoogleIcon from '../Icons/GoogleIcon';
import { account } from '../../appwrite';
// import { isEmpty, startCase } from "lodash"
import * as Yup from 'yup';
import {
    Formik,
} from 'formik';

interface AuthFormData {
    email: string;
    password: string;
}

export default function LoginPage() {
    const [formData, setFormData] = useState<AuthFormData>({
        email: '',
        password: '',
    });

    // const [formError, setFormError] = useState<AuthFormData>({
    //     email: '',
    //     password: '',
    // });

    const initialValues: AuthFormData = { email: '', password: "" };
    
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters long')
            .required('Password is required'),
    });

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // setFormError((prev) => ({
        //     ...prev,
        //     [name]: isEmpty(value) ? `${startCase(name)} is required` : '',
        // }));
    };

    const handleLoginWithGoogle = async () => {
        try {
            await loginWithGoogle();
            const user = await account.get();

            localStorage.setItem('user', JSON.stringify(user));
            console.log(user, "user")
        } catch (error) {
            console.error(error);
        }
    };


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        emailSignIn(formData.email, formData.password)
    };

    return (
        <div className="min-h-screen relative z-0 flex w-full">
            {/* Right Side: Image slider*/}
            <div className="hidden md:flex w-1/2 bg-blue-500 items-center justify-center">
                <div className="text-white text-4xl font-bold animate-bounce">
                    Welcome Back!
                </div>
            </div>
            {/* Left Side: Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-gray-100">
                <h2 className="text-3xl font-light mb-3">Hello Again!</h2>
                <h5>Connect with your peers and start building something amazing</h5>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        console.log({ values, actions });
                        actions.setSubmitting(false);
                    }}
                >
                    <form onSubmit={handleSubmit} className="w-full mt-6 max-w-sm">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.email}
                                onChange={handleOnChange}
                                required
                                name='email'
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.password}
                                onChange={handleOnChange}
                                required
                                name='password'
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Login
                        </button>
                        <p className='text-center mt-3'>Not a member? <a href="/signup" className="text-blue-500">Sign up</a></p>
                        <button
                            type="submit"
                            className="w-full mt-5 border py-3 rounded-lg text-black font-light flex items-center justify-center space-x-2 transition-colors"
                            onClick={handleLoginWithGoogle}
                        >
                            <GoogleIcon />
                            <span>Sign in with Google</span>
                        </button>
                    </form>
                </Formik>

            </div>
        </div>
    );
}
