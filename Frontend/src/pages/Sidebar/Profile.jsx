import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  Home, 
  FileText,
  Edit2,
  Save,
  X,
  LogOut
} from 'lucide-react';
import { api } from '../../Utils/AxiosHelper.js';
import { UserContext } from '../../Context/UserContext';

const Profile = () => {

    const {user, setUser} = useContext(UserContext)
    // console.log("Current User ", user)

    const navigate = useNavigate();
    
    const [profile, setProfile] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        aadharCardNumber: '',
        address: '',
        role: ''
    });
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        aadharCardNumber: '',
        address: '',
        role: ''
    });

    

    // useEffect(() => {
    //     const fetchUserProfile = async () => {
    //         try {
    //             const response = await api.post('/users/get-current-user'); // Changed from post to get
    //             if (response.status !== 200) {
    //                 throw new Error('Failed to fetch user profile');
    //             }
    //             const data = response.data; // Changed from response.data() to response.data
    //             setProfile(data);
    //             setEditedProfile(data);
    //         } catch (error) {
    //             setError('Error fetching user profile');
    //             console.error(error);
    //         }
    //     };

    //     fetchUserProfile();
    // }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setEditedProfile(profile);
        setIsEditing(false);
    };

    const handleSave = async () => {
        setError('');
        try {
            // Make API call to update profile
            const response = await api.put('/users/update-profile', editedProfile);
            if (response.status !== 200) {
                throw new Error('Failed to update profile');
            }
            setProfile(editedProfile);
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            setError('Error updating profile');
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogout = async () => {
        try {
            // Send logout request to the server
            await api.post("/users/logout");
    
            localStorage.removeItem("authToken"); 

            // Clear cookies
            document.cookie.split(";").forEach((cookie) => {
                const [name] = cookie.split("=");
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            });
            // Update application state (e.g., clear user data)
            setUser(null); // Example: Assuming you have a setUser function in context/state
    
            navigate('/')
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Failed to logout Or already logged out.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 ">
            <div className="max-w-full mx-auto py-8 px-4">
                {/* Profile Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-10 h-10 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={editedProfile.fullName || ''}
                                            onChange={handleChange}
                                            className="border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                                        />
                                    ) : (
                                        user?.fullName
                                    )}
                                </h1>
                                <p className="text-gray-600">
                                    {user?.role }
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    <Edit2 className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* Profile Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Mail className="w-5 h-5 text-gray-500 mr-3" />
                                <div className="flex-1">
                                    <label className="text-sm text-gray-500">Email</label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={editedProfile.email || ''}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                                        />
                                    ) : (
                                        <p className="text-gray-800">{user?.email}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Phone className="w-5 h-5 text-gray-500 mr-3" />
                                <div className="flex-1">
                                    <label className="text-sm text-gray-500">Phone Number</label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={editedProfile.phoneNumber || ''}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                                        />
                                    ) : (
                                        <p className="text-gray-800">{user?.phoneNumber}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FileText className="w-5 h-5 text-gray-500 mr-3" />
                                <div className="flex-1">
                                    <label className="text-sm text-gray-500">Aadhar Number</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="aadharCardNumber"
                                            value={editedProfile.aadharCardNumber || ''}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                                        />
                                    ) : (
                                        <p className="text-gray-800">{user?.aadharCardNumber}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Address Information</h2>
                        <div className="flex items-start">
                            <Home className="w-5 h-5 text-gray-500 mr-3 mt-1" />
                            <div className="flex-1">
                                <label className="text-sm text-gray-500">Address</label>
                                {isEditing ? (
                                    <textarea
                                        name="address"
                                        value={editedProfile.address || ''}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                                        rows="3"
                                    />
                                ) : (
                                    <p className="text-gray-800">{user?.address}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;