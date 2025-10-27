import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import LeftSidebar from '../components/dashboardComp/LeftSidebar.jsx'; // Sidebar DENGAN logo
import DashboardHeader from '../components/dashboardComp/DashboardHeader.jsx'; // Header TANPA logo
import ChatPopup from '../components/dashboardComp/ChatPopup.jsx';

import { Settings, Camera, User as UserIcon, Briefcase, PlusCircle, Bookmark, CalendarCheck, Heart, Users } from 'lucide-react';

function ProfilePage() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profilePicture: 'https://via.placeholder.com/100',
    points: 0, 
    history: [], 
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const settingsDropdownRef = useRef(null);
  
  const navigate = useNavigate();

    useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo) {
      navigate('/login');
    } else {
      const fetchProfile = async () => {
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          
          const { data } = await axios.get(
            `http://localhost:5000/api/users/profile`, 
            config
          );
          
          setUser({ 
            ...user, 
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            profilePicture: data.profilePicture || 'https://via.placeholder.com/100',
          });
          setEditForm({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
          });

        } catch (error) {
          console.error('Gagal mengambil profile', error);
          if (error.response && error.response.status === 401) {
            localStorage.removeItem('userInfo');
            navigate('/login');
          }
        }
      };
      fetchProfile();
    }
  }, [navigate]);

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

  const handleSaveProfile = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/users/profile`,
        editForm,
        config
      );
      
      setUser({ ...user, ...data });
      localStorage.setItem('userInfo', JSON.stringify(data)); 
      setIsEditingProfile(false);

    } catch (error) {
       console.error('Gagal update profile', error);
    }
  };


  return (
    <div className="flex h-screen bg-gray-100"> {/* UBAH: Hapus flex-col */}
      <LeftSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <DashboardHeader />

        <div className="flex-1 overflow-y-auto">
          <main className="w-full max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-sm border mb-6">
              <div className="relative h-32 bg-gray-200 rounded-t-lg flex items-end justify-between p-4">
                <div className="relative -mb-10 left-4">
                  <div className="h-24 w-24 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center text-gray-600 text-4xl font-semibold">
                    {user.firstName ? user.firstName.charAt(0) : 'X'}
                    <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md border">
                      <Camera className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="relative" ref={settingsDropdownRef}>
                  <button 
                    onClick={() => setIsSettingsDropdownOpen(!isSettingsDropdownOpen)}
                    className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
                  >
                    <Settings className="h-6 w-6 text-gray-600" />
                  </button>
                  {isSettingsDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border overflow-hidden z-10">
                      <Link to="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Edit Profile Settings
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 pt-16">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600">Pleasant and High (Dummy)</p>
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
              <p className="text-gray-500">No interests added yet.</p>
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
        </div>
      </div>

      {isEditingProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-4">Edit Your Profile</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="firstName"
                value={editForm.firstName}
                onChange={handleEditChange}
                className="w-full p-2 border rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]"
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                value={editForm.lastName}
                onChange={handleEditChange}
                className="w-full p-2 border rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]"
                placeholder="Last Name"
              />
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                className="w-full p-2 border rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]"
                placeholder="Email"
              />
              <input
                type="tel"
                name="phoneNumber"
                value={editForm.phoneNumber}
                onChange={handleEditChange}
                className="w-full p-2 border rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]"
                placeholder="Phone Number"
              />
              <div className="flex gap-2 justify-end mt-4">
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

      <ChatPopup />
    </div>
  );
}

export default ProfilePage;