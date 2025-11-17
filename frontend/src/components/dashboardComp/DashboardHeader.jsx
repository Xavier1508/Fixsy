import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, MessageSquare, LogOut, Briefcase, User as UserIcon, ChevronDown } from 'lucide-react';

const BACKEND_URL = 'http://localhost:5000';

const DashboardHeader = ({ dynamicContent }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userInitial = userInfo?.firstName ? userInfo.firstName.charAt(0).toUpperCase() : 'X';
  const userAvatar = userInfo?.profilePicture ? `${BACKEND_URL}${userInfo.profilePicture}` : null;

  const handleSignOut = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  return (
    // 2. Header DIBUAT STICKY DAN CLEAN (border-b)
    <header className="bg-white sticky top-0 z-30 border-b border-gray-200">
      <div className="px-4 md:px-6 lg:px-8">
        {/* Bagian Atas Header (Search Bar, Ikon Profil) */}
        <div className="flex items-center justify-between h-16">
            
            <div className="flex-1 flex justify-center px-8">
              <div className="w-full max-w-lg">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" />
                  </span>
                  <input 
                    type="text"
                    placeholder="Search for services, neighbors..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#7abbe6] text-sm"
                  />
                </div>
              </div>
            </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <MessageSquare className="h-6 w-6" />
            </button>
            
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center"
              >
                {userAvatar ? (
                  <img src={userAvatar} alt="Profile" className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <span className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-semibold text-lg">
                    {userInitial}
                  </span>
                )}
                <span className="relative -ml-3 h-5 w-5 bg-white rounded-full border border-gray-300 flex items-center justify-center shadow-sm">
                  <ChevronDown className="h-3 w-3 text-gray-600" />
                </span>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden border">
                  <div className="p-4 border-b">
                    <div className="flex items-center space-x-3">
                      {userAvatar ? (
                        <img src={userAvatar} alt="Profile" className="h-12 w-12 rounded-full object-cover" />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-semibold text-xl">
                          {userInitial}
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-800">{userInfo?.firstName || 'User'}</h4>
                        <p className="text-sm text-gray-500">Pleasant and High</p>
                      </div>
                    </div>
                  </div>
                  <nav className="py-2">
                    <Link 
                      to="/dashboard/profile" 
                      onClick={() => setIsDropdownOpen(false)} 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <UserIcon className="h-5 w-5 mr-3" /> View profile
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-5 w-5 mr-3" /> Sign out
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {dynamicContent && (
        <div className="px-4 md:px-6 lg:px-8">
          {dynamicContent}
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;