import { useState } from "react";
import { emailSignUp, loginWithGoogle } from "../../rest/auth";
import GoogleIcon from "../Icons/GoogleIcon";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { cleanErrorMessage } from "../../utils/errorMessage.utils";
import toast from "react-hot-toast";
import { ToastComponent } from "../../common/ToastComponent";
import { account } from "../../appwrite";
import { useNavigate } from "react-router-dom";

interface AuthFormData {
    email: string;
    password: string;
}
export const Singup = () => {
    const [formError, setFormError] = useState<string>();
    const navigate = useNavigate()

    const initialValues: AuthFormData = { email: "", password: "" };
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters long")
            .required("Password is required"),
    });

    const handleSignupWithGoogle = async () => {
        try {
            await loginWithGoogle();
            const user = await account
                .get()
                .then(() => toast.success("Congratulations! Your account been successfully created."));
            localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
            console.error(error);
        }
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
                {formError && <ToastComponent errorType="error" message={formError} />}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        console.log({ values, actions });
                        emailSignUp(values.email, values.password)
                            .then((user) => {
                                toast.success("Sign up successfully!");
                                localStorage.setItem("user", JSON.stringify(user));
                                actions.setSubmitting(false);
                                navigate("/login")
                            })
                            .catch((error) => {
                                const errorMessage = cleanErrorMessage(error);
                                setFormError(errorMessage);
                                actions.setSubmitting(false);
                            });
                    }}
                >
                    {({ handleSubmit, handleChange, values, errors, touched }) => (
                        <Form className="w-full mt-6 max-w-sm" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className={`w-full p-3 border ${errors.email && touched.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    value={values.email}
                                    onChange={(e) => {
                                        handleChange(e);
                                        setFormError("");
                                    }}
                                    name="email"
                                />
                                {errors.email && touched.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className={`w-full p-3 border ${errors.password && touched.password
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    value={values.password}
                                    onChange={(e) => {
                                        handleChange(e);
                                        setFormError("");
                                    }}
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
                                Signup
                            </button>
                            <p className="text-center mt-3">
                                Already have a account?
                                <a href="/login" className="text-blue-500">
                                    Login
                                </a>
                            </p>
                            <button
                                type="button"
                                className="w-full mt-5 border py-3 rounded-lg text-black font-light flex items-center justify-center space-x-2 transition-colors"
                                onClick={handleSignupWithGoogle}
                            >
                                <GoogleIcon />
                                <span>Sign up with Google</span>
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
