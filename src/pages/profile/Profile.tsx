import { useEffect, useState } from "react";
import { getUser } from "../../rest/auth";
import { Sidebar } from "../../components/sidebar/Sidebar";
import moment from "moment";
import { Pencil } from "lucide-react";
import userImage from "../../assets/images/user.png";

import {
  updateName,
  updatePassword,
  updatePreferences,
} from "../../rest/profile";
import toast from "react-hot-toast";
import { getUserPhotoUrl, handleUpload } from "../../rest/upload";

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
  prefs: {
    github: string;
    linkedin: string;
    twitter: string;
    bio:string;
    designation:string;
    website:string;
  };
};

function Profile() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [formData, setFormData] = useState({
    github: "",
    linkedin: "",
    twitter: "",
    bio:"",designation:"",website:""
  });
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [userProfileImage, setUserProfileImage] = useState<string>(userImage);

  const fetchUserProfileImage = async () => {
    try {
      const response = await getUserPhotoUrl("67a838bc000b96a51af1");
      setUserProfileImage(response.href);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserProfileImage();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUserProfileUpload = async () => {
    if (file) {
      const response = await handleUpload(file);
      console.log("Uploaded File:", response);
    } else {
      alert("Please select a file first.");
    }
  };
  
  const handleUpdateBasicInfo= async() => {
    try {
      await updatePreferences(formData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData as unknown as User);
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
  console.log(user, "user");
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
            <div className="mb-4 flex items-center">
              <div className="relative w-24 h-24">
                <img
                  src={file ? URL.createObjectURL(file) : userProfileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                />

                <label className="absolute bottom-1 right-1 bg-black bg-opacity-70 p-2 rounded-full cursor-pointer">
                  <Pencil className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <button
                className="flex items-center ml-8 w-fit h-fit py-1 px-4 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all"
                onClick={handleUserProfileUpload}
              >
                Upload
              </button>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.name}
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
                  value={name|| user.name}
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
                  value={formData.designation||user.prefs.designation}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Designation Role"
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 w-24">Website:</label>
                <input
                  type="text"
                  value={formData.website||user.prefs.website}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Website"
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 w-24">Brief Bio</label>
                <input
                  type="text"
                  value={formData.bio||user.prefs.bio}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Write a short bio about yourself..."
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleUpdateBasicInfo}
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
                  value={formData.github||user.prefs.github}
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
                  value={formData.linkedin||user.prefs.linkedin}
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
                  value={formData.twitter||user.prefs.twitter}
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
