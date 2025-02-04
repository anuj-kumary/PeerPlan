import {  useEffect, useState } from "react";
import { getUser } from "../../rest/auth";
import { Sidebar } from "../../components/sidebar/Sidebar";
import moment from "moment";
import {
  updateName,
  updatePassword,
  updatePreferences,
} from "../../rest/profile";
import toast from "react-hot-toast";
import { handleUpload } from "../../rest/upload";

type User = {
  $id: string;
  name: string;
  registration: string;
  status: boolean;
  labels: string[];
  passwordUpdate: string;
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
};

function Profile() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [formData, setFormData] = useState({
    github: "",
    linkedin: "",
    twitter: "",
  });
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  

  const handleUserProfileUpload = async () => {
    if (file) {
      const response = await handleUpload(file)
      console.log("Uploaded File:", response);
    } else {
      alert("Please select a file first.");
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        setUser(undefined);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">User not found.</p>
      </div>
    );
  }
  const handleUpdateProfilePreference = async () => {
    try {
      await updatePreferences(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateName = async () => {
    try {
      await updateName(name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePassword = async () => {
    if (password.newPassword !== password.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await updatePassword(password.newPassword);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-white min-h-screen w-full">
      <Sidebar />
      <div className="min-h-screen w-full bg-gray-50 p-10">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
            <div className="mb-4">
              <div className="p-4 rounded-full border-4 border-indigo-500">
                AY
              </div>
              <input accept="image/*" type="file" onChange={handleFileChange} />
              <button onClick={handleUserProfileUpload}>Upload</button>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Anuj Kumar Yadav
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Joined {moment(user.registration).format("MMM Do YY")}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Update Name
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 w-24">New Name:</label>
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter new name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button
                onClick={handleUpdateName}
                className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
              >
                Update
              </button>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Update Basic Info.
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 w-24">Designation Role:</label>
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Designation Role"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 w-24">Website:</label>
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Website"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 w-24">Brief Bio</label>
                <input
                  value={formData.twitter}
                  type="text"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Write a short bio about yourself..."
                  onChange={(e) =>
                    setFormData({ ...formData, twitter: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleUpdateName}
                className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
              >
                Update
              </button>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Update Social Usernames
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 w-24">GitHub:</label>
                <input
                  value={formData.github}
                  type="text"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="GitHub Username"
                  onChange={(e) =>
                    setFormData({ ...formData, github: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 w-24">LinkedIn:</label>
                <input
                  value={formData.linkedin}
                  type="text"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="LinkedIn Username"
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 w-24">Twitter:</label>
                <input
                  value={formData.twitter}
                  type="text"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Twitter Username"
                  onChange={(e) =>
                    setFormData({ ...formData, twitter: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleUpdateProfilePreference}
                className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
              >
                Update
              </button>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Update Password
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 w-24">New Password:</label>
                <input
                  value={password.newPassword}
                  type="password"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter new password"
                  onChange={(e) =>
                    setPassword({ ...password, newPassword: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 w-24">Confirm Password:</label>
                <input
                  value={password.confirmPassword}
                  type="password"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Confirm new password"
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              <button
                onClick={handleUpdatePassword}
                className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
