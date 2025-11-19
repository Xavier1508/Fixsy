import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Tag, Newspaper, Heart, MapPin, Users, Calendar } from 'lucide-react';
import logoImg from '../../assets/images/logo.png';

const navLinks = [
  { icon: Home, label: 'Home', href: '/dashboard/home' },
  { icon: Tag, label: 'For Sale & Free', href: '/dashboard/forsale' },
  { icon: Newspaper, label: 'Local News', href: '/dashboard/news' },
  // { icon: Heart, label: 'Faves', href: '/dashboard/faves' },
  // { icon: MapPin, label: 'Treat Map', href: '/dashboard/treatmaps' },
  { icon: Users, label: 'Groups', href: '/dashboard/groups' },
  { icon: Calendar, label: 'Events', href: '/dashboard/events' },
];

const LeftSidebar = ({ onOpenCreatePost }) => {
  const location = useLocation();

return (
    <aside className="hidden md:block w-64 bg-white pt-0.7 px-4 pb-4 sticky top-0 h-screen flex-col">
      <div className="flex items-center flex-shrink-0 h-15 -mx-4 px-4 mb-9">
        <img className="h-11 w-auto mr-1.5" src={logoImg} alt="Fixsy Logo" />
        <Link to="/dashboard" className="font-bold text-4xl text-[#3a9bdc]">Fixsy</Link>
      </div>
      <nav className="flex flex-col space-y-1">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.label}
              to={link.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium ${
                isActive 
                  ? 'bg-[#e0f2fe] text-[#3a9bdc]' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <link.icon className="h-5 w-5" />
              <span className="text-sm">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <button 
        onClick={onOpenCreatePost}
        className="w-full mt-5 py-2.5 px-4 rounded-full bg-[#3a9bdc] text-white font-semibold hover:bg-[#2582c0] transition-colors"
      >
        Post
      </button>
        <div className="absolute bottom-4 left-4 text-sm text-gray-500 space-y-1">
          <Link to="/dashboard/settings" className="block hover:underline">Settings</Link>
          <Link to="/dashboard/help" className="block hover:underline">Help Center</Link>
          <Link to="/dashboard/invite" className="block hover:underline">Invite neighbors</Link>
        </div>
    </aside>
  );
};

export default LeftSidebar;