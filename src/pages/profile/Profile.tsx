import { useEffect, useState } from 'react'
import { getUser } from '../../rest/auth'
import { Sidebar } from '../../components/sidebar/Sidebar';
import moment from 'moment';
import { updatePreferences } from '../../rest/prefs';

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
    const [user, setUser] = useState<User | undefined>(undefined)
    const [formData, setFormData] = useState({
        name: "",
    })
    console.log(user, "user")

    useEffect(() => {
        const checkUser = async () => {
            try {
                const userData = await getUser()
                setUser(userData)
            } catch (error) {
                setUser(undefined)
                console.log(error)
            }
        }

        checkUser()
    }, [])

    if (!user) {
        return
    }
    const handleUpdateProfilePreference = async () => {
        console.log(formData,"formData")
        try {
            const response = await updatePreferences(formData)
            console.log(response, "response")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex bg-white min-h-screen w-full">
            <Sidebar />
            <div className="min-h-screen w-full bg-gray-50 p-10">
                <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                        <div className="mb-4">
                            <div
                                className="p-4 rounded-full border-4 border-indigo-500"
                            >AY</div>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">Anuj Kumar Yadav</h2>
                        <p className="text-sm text-gray-500 mt-2">Joined {moment(user.registration).format("MMM Do YY")}</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Update Name</h3>
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-2">
                                <label className="text-gray-700 w-24">New Name:</label>
                                <input
                                    value={formData.name}
                                    type="text"
                                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter new name"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Update Social Usernames</h3>
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-2">
                                <label className="text-gray-700 w-24">GitHub:</label>
                                <input
                                    type="text"
                                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="GitHub Username"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="text-gray-700 w-24">LinkedIn:</label>
                                <input
                                    type="text"
                                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="LinkedIn Username"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="text-gray-700 w-24">Twitter:</label>
                                <input
                                    type="text"
                                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Twitter Username"
                                />
                            </div>
                            <button
                                className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
                            >
                                Update
                            </button>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Update Password</h3>
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-2">
                                <label className="text-gray-700 w-24">New Password:</label>
                                <input
                                    type="password"
                                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="text-gray-700 w-24">Confirm Password:</label>
                                <input
                                    type="password"
                                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Confirm new password"
                                />
                            </div>
                            <button
                                className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
                            >
                                Update
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile
