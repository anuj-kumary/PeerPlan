import { useEffect } from "react";
import { account } from "../../appwrite";
import { ToastComponent } from "../../common/ToastComponent";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const { loading, userInfo } = useIsLoggedIn();
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo?.emailVerification) {
      navigate("/dashboard"); 
    }
  }, [userInfo, navigate]);

  if (loading || !userInfo) {
    return <div>Loading...</div>;
  }

  const handleSendVerification = async () => {
    try {
      const redirectURL = `${window.location.origin}/verified-email`;
      await account.createVerification(redirectURL);
      <ToastComponent errorType='success' message="Verification link sent successfully!" />
    } catch (error) {
      console.log(error, "error")
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow rounded text-center">
        <h1 className="text-2xl font-semibold mb-4">Verify Your Email</h1>
        <p className="mb-4 text-gray-700">
          Your email address {userInfo.email} is not verified. Please verify your email to continue.
        </p>
        {status === "loading" ? (
          <p className="text-blue-500">Sending verification email...</p>
        ) : status === "success" ? (
          <p className="text-green-500">{"message"}</p>
        ) : status === "error" ? (
          <p className="text-red-500">{"message"}</p>
        ) : (
          <button
            onClick={handleSendVerification}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send Verification Email
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
