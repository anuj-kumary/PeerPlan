import { emailSignIn, loginWithGoogle } from '../../rest/auth';
import GoogleIcon from '../Icons/GoogleIcon';
import { account } from '../../appwrite';
// import { isEmpty, startCase } from "lodash"
import * as Yup from 'yup';
import {
    Formik,
    Form
} from 'formik';

interface AuthFormData {
    email: string;
    password: string;
}

export default function LoginPage() {
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


    const handleLoginWithGoogle = async () => {
        try {
            await loginWithGoogle();
            const user = await account.get();
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.error(error);
        }
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
                <div className="flex items-center max-md:flex-col gap-6 bg-gradient-to-tr from-blue-700 to-purple-400 text-white px-6 py-3.5 rounded font-[sans-serif]">
                    <p className="text-base flex-1 max-md:text-center">Don't miss out on our amazing summer sale! Get up to 50% off on a wide range of products. Make the most of your summer shopping.</p>

                    <div>
                        <button type="button" className="bg-white text-blue-500 py-2.5 px-5 rounded text-sm">
                            Get Offer
                        </button>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 cursor-pointer fill-white inline-block ml-4" viewBox="0 0 320.591 320.591">
                            <path
                                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                data-original="#000000" />
                            <path
                                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                data-original="#000000" />
                        </svg>
                    </div>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        console.log({ values, actions });
                        emailSignIn(values.email, values.password)
                            .then((response) => {
                                // Handle successful login response
                                console.log('Login successful:', response);
                                actions.setSubmitting(false);
                            })
                            .catch((error) => {
                                // Handle login error
                                console.error('Login failed:', error);
                                actions.setSubmitting(false);
                            });
                    }}
                >
                    {({ handleSubmit, handleChange, values, errors, touched }) => (
                        <Form className="w-full mt-6 max-w-sm" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className={`w-full p-3 border ${errors.email && touched.email
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    value={values.email}
                                    onChange={handleChange}
                                    name="email"
                                />
                                {errors.email && touched.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className={`w-full p-3 border ${errors.password && touched.password
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    value={values.password}
                                    onChange={handleChange}
                                    name="password"
                                />
                                {errors.password && touched.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Login
                            </button>
                            <p className="text-center mt-3">
                                Not a member?{' '}
                                <a href="/signup" className="text-blue-500">
                                    Sign up
                                </a>
                            </p>
                            <button
                                type="button"
                                className="w-full mt-5 border py-3 rounded-lg text-black font-light flex items-center justify-center space-x-2 transition-colors"
                                onClick={handleLoginWithGoogle}
                            >
                                <GoogleIcon />
                                <span>Sign in with Google</span>
                            </button>
                        </Form>
                    )}
                </Formik>


            </div>
        </div>
    );
}
