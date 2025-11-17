// frontend/src/pages/ProfilePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Settings, Camera, User as UserIcon, Briefcase, PlusCircle, Bookmark, CalendarCheck, MapPin, Hash, Users, Heart } from 'lucide-react'; // Saya juga tambahkan 'Heart' yang mungkin Anda perlukan

const BACKEND_URL = 'http://localhost:5000';

function ProfilePage() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profilePicture: '',
    coverPhoto: '',
    bio: '',
    location: '',
    interests: [],
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    location: '',
    interests: '', // Kita gunakan string terpisah koma untuk input
  });
  
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const settingsDropdownRef = useRef(null);
  const profilePicInputRef = useRef(null);
  const coverPhotoInputRef = useRef(null);
  
  const navigate = useNavigate();

  // Fungsi untuk mengambil token
  const getToken = () => JSON.parse(localStorage.getItem('userInfo'))?.token;

  // Mengambil data profil saat load
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      navigate('/login');
    } else {
      fetchProfile();
    }
  }, [navigate]);

  const fetchProfile = async () => {
    const token = getToken();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      // --- PERBAIKAN 1 ---
      const { data } = await axios.get(`http://localhost:5000/api/users/profile`, config); // Kurung kurawal '}' ekstra dihapus
      
      setUser(data);
      setEditForm({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        bio: data.bio || '',
        location: data.location || '',
        interests: (data.interests || []).join(', '), // Ubah array jadi string
      });
    } catch (error) {
      console.error('Gagal mengambil profile', error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('userInfo');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target)) {
        setIsSettingsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // Menyimpan data PUBLIK (Edit Profile)
  const handleSaveProfile = async () => {
    try {
      const token = getToken();
      const config = {
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
         },
      };
      
      const interestsArray = editForm.interests.split(',').map(item => item.trim()).filter(Boolean);
      const dataToUpdate = {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        bio: editForm.bio,
        location: editForm.location,
        interests: interestsArray,
      };

      const { data } = await axios.put( // Kurung kurawal '}' ekstra dihapus
        `http://localhost:5000/api/users/profile`,
        dataToUpdate,
        config
      );
      
      setUser(data);
      const updatedUserInfo = { ...JSON.parse(localStorage.getItem('userInfo')), ...data };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo)); 
      
      setIsEditingProfile(false);
    } catch (error) {
       console.error('Gagal update profile', error);
    }
  };

  // Handler untuk upload file
  const handleFileUpload = async (e, endpoint, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append(fieldName, file);

    try {
      const token = getToken();
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post( // Kurung kurawal '}' ekstra dihapus
        `http://localhost:5000/api/users/profile/${endpoint}`,
        formData,
        config
      );
      
      const updatedUser = { ...user, [fieldName]: data[fieldName] };
      setUser(updatedUser);
      const updatedUserInfo = { ...JSON.parse(localStorage.getItem('userInfo')), [fieldName]: data[fieldName] };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

    } catch (error) {
      console.error('Gagal upload file', error);
    }
  };

  const defaultCover = "bg-gray-200";
  const defaultAvatar = null;

  return (
      <>
        {/* Input file yang tersembunyi */}
        <input 
          type="file" 
          ref={profilePicInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={(e) => handleFileUpload(e, 'upload-avatar', 'profilePicture')}
        />
        <input 
          type="file" 
          ref={coverPhotoInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={(e) => handleFileUpload(e, 'upload-cover', 'coverPhoto')}
        />

        <main className="w-full max-w-3xl mx-auto">
          {/* Profile Card Header */}
          <div className="bg-white rounded-lg shadow-sm border mb-6">
            <div className={`relative h-49 rounded-t-lg ${!user.coverPhoto && defaultCover}`}>
              {user.coverPhoto && (
                <img 
                  src={`${BACKEND_URL}${user.coverPhoto}`} 
                  alt="Cover" 
                  className="w-full h-54 object-cover rounded-t-lg" 
                />
              )}
              <button 
                onClick={() => coverPhotoInputRef.current.click()}
                className="absolute top-4 right-4 bg-white p-1 rounded-full shadow-md border"
              >
                <Camera className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="relative flex justify-between p-4 pt-0">
              <div className="relative -mt-14">
                <div className="h-32 w-32 rounded-full border-4 border-white text-gray-600 text-4xl font-semibold relative">
                  {user.profilePicture ? (
                    <img 
                      src={`${BACKEND_URL}${user.profilePicture}`} 
                      alt="Profile" 
                      className="h-full w-full rounded-full object-cover" 
                    />
                  ) : (
                    <div className="h-full w-full rounded-full bg-gray-300 flex items-center justify-center">
                      {user.firstName ? user.firstName.charAt(0) : 'X'}
                    </div>
                  )}
                  <button 
                    onClick={() => profilePicInputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md border"
                  >
                    <Camera className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="relative pt-4 translate-y-4" ref={settingsDropdownRef}>
                <button 
                  onClick={() => setIsSettingsDropdownOpen(!isSettingsDropdownOpen)}
                  className="p-2 rounded-full bg-white shadow hover:bg-gray-100 border"
                >
                  <Settings className="h-6 w-6 text-gray-600" />
                </button>
                {isSettingsDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border overflow-hidden z-10">
                    <Link to="/dashboard/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Edit Profile Settings
                    </Link>
                  </div>
                )}
              </div>
            </div>

              <div className="p-4 pt-0">
              <h2 className="text-2xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600">{user.location || 'Tambahkan lokasi Anda'}</p>
              <p className="text-gray-800 mt-2">{user.bio || 'Tambahkan bio singkat...'}</p>
              
              <div className="mt-4 flex space-x-3">
                <button 
                  onClick={() => setIsEditingProfile(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#e0f2fe] text-[#3a9bdc] rounded-full font-medium hover:bg-[#ccebfd]"
                >
                  <UserIcon className="h-5 w-5" />
                  <span>Edit profile</span>
                </button>

                <Link 
                  to="/business/create"
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50"
                >
                  <Briefcase className="h-5 w-5" />
                  <span>Add business page</span>
                </Link>
              </div>
            </div>
          </div>

            {/* Bagian Dashboard Progress */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Dashboard</h3>
                <span className="text-sm text-gray-500">Only visible to you</span>
              </div>
              <div className="mb-4">
                <p className="text-gray-700 text-sm mb-1">Profile progress: 0% (Dummy)</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#3a9bdc] h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                  <PlusCircle className="h-5 w-5 mb-1 text-gray-600" /> Add Interests
                </button>
                <button className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                  <Camera className="h-5 w-5 mb-1 text-gray-600" /> Add a profile photo
                </button>
                <button className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                  <UserIcon className="h-5 w-5 mb-1 text-gray-600" /> Add a bio
                </button>
                <button className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                  <Users className="h-5 w-5 mb-1 text-gray-600" /> Post your introduction
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6 flex space-x-4">
              <Link to="/profile/bookmarks" className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
                <Bookmark className="h-5 w-5" /> <span>Bookmarks (0)</span>
              </Link>
              <Link to="/profile/events" className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
                <CalendarCheck className="h-5 w-5" /> <span>Events (0)</span>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Interests</h3>
              {user.interests && user.interests.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.interests.map(interest => (
                    <span key={interest} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No interests added yet.</p>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Groups</h3>
              <p className="text-gray-500 mb-4">No groups yet</p>
              <button className="px-4 py-2 bg-[#e0f2fe] text-[#3a9bdc] rounded-full font-medium hover:bg-[#ccebfd]">
                Explore groups
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Posts</h3>
                <Link to="/profile/activity" className="text-[#3a9bdc] hover:underline text-sm">See activity</Link>
              </div>
              <div className="flex items-start space-x-3 p-3 border-t first:border-t-0">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-600 flex-shrink-0">
                  {user.firstName ? user.firstName.charAt(0) : 'X'}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">
                    {user.firstName} {user.lastName} <span className="text-gray-500 text-sm">- 26 Sep</span>
                  </p>
                  <p className="text-gray-700">Xavier Renjiro just joined Fixsy.</p>
                  <div className="flex space-x-4 mt-2 text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-[#3a9bdc]">
                      <Heart className="h-4 w-4" /> <span>0</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-[#3a9bdc]">
                      <CalendarCheck className="h-4 w-4" /> <span>0</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-[#3a9bdc]">
                      <Users className="h-4 w-4" /> <span>0</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </main>

          {/* Modal Edit Profile */}
          {isEditingProfile && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
                <h3 className="text-xl font-semibold mb-4">Edit Your Profile</h3>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={editForm.firstName}
                        onChange={handleEditChange}
                        className="w-full p-2 border rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={editForm.lastName}
                        onChange={handleEditChange}
                        className="w-full p-2 border rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={editForm.bio}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]"
                      placeholder="Ceritakan sedikit tentang diri Anda..."
                      rows="3"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={editForm.location}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]"
                      placeholder="Misal: Pleasant and High"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
                    <input
                      type="text"
                      name="interests"
                      value={editForm.interests}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]"
                    />
                    <p className="text-xs text-gray-500 mt-1">Pisahkan dengan koma (misal: Memasak, Olahraga)</p>
                  </div>
                                    
                  <div className="flex gap-2 justify-end pt-4 border-t">
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-[#3a9bdc] text-white rounded-lg hover:bg-[#2582c0] transition"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
    </>
  );
}

export default ProfilePage;