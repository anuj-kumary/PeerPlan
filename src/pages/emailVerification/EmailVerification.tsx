import { account } from "../../appwrite";
import { ToastComponent } from "../../common/ToastComponent";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

const EmailVerification = () => {
  const { loading, userInfo } = useIsLoggedIn();

  // Show a fallback UI while determining the login status
  if (loading || !userInfo) {
    return <div>Loading...</div>; // Replace with a spinner or skeleton if needed
  }
  const handleSendVerification = async () => {
    try {
      const redirectURL = `${window.location.origin}/verify-email`;
      await account.createVerification(redirectURL);
      <ToastComponent errorType='success' message="Verification link sent successfully!" />
    } catch (error) {
      console.log(error, "error")
      // handle error
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
