import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { appwriteService } from "../../server/api/function/appwrite";

type UserDetails = {
  $id: string;
  name: string;
  email: string;
  phone: string;
  prefs: {
    github: string;
    linkedin: string;
    twitter: string;
  };
};

function UserDetailsPage() {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!userId) return;
        const response = await appwriteService.getUser(userId);
        setUserDetails({
          ...response,
          prefs: {
            github: response.prefs?.github || "",
            linkedin: response.prefs?.linkedin || "",
            twitter: response.prefs?.twitter || ""
          }
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userDetails) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex bg-white min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-6 mb-6">
            <img
              src="https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg"
              alt={userDetails.name}
              className="w-32 h-32 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{userDetails.name}</h1>
              <p className="text-gray-600">{userDetails.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <p>
                <span className="font-medium">Phone:</span> {userDetails.phone || "Not provided"}
              </p>
              <p>
                <span className="font-medium">Email:</span> {userDetails.email}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Social Links</h2>
              {userDetails.prefs.github && (
                <p>
                  <span className="font-medium">GitHub:</span>{" "}
                  <a href={userDetails.prefs.github} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {userDetails.prefs.github}
                  </a>
                </p>
              )}
              {userDetails.prefs.linkedin && (
                <p>
                  <span className="font-medium">LinkedIn:</span>{" "}
                  <a href={userDetails.prefs.linkedin} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {userDetails.prefs.linkedin}
                  </a>
                </p>
              )}
              {userDetails.prefs.twitter && (
                <p>
                  <span className="font-medium">Twitter:</span>{" "}
                  <a href={userDetails.prefs.twitter} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {userDetails.prefs.twitter}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsPage; 