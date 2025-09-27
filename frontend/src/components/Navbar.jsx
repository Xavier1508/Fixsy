import React, {useState} from 'react';
import { navItems } from '../constant/index.jsx'
import logoImg from '../assets/images/logo.png';

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleMouseEnter = (index) => {
    setOpenDropdown(index);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  }

  return (
    <nav className="w-full sticky bg-white/85 top-0 z-50 py-3 shadow-xl backdrop-blur-lg border-b border-neutral-700/30 h-25">
      <div className="max-w-screen-2xl mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">

          <div className="flex items-center flex-shrink-0">
            <img className="h-10/12 w-15 mr-1.5" src={logoImg} alt="Fixsy Logo" />
            <a href="/" className="font-bold text-5xl tracking-tight text-[#3a9bdc]">Fixsy</a>
          </div>

          <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index} className="relative" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                <a href={item.href} className="text-lg text-gray-600 font-medium hover:text-[#3a9bdc] flex items-center">{item.label}{item.submenu && (<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>)}</a>
                {item.submenu && openDropdown === index && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                    {item.submenu.map((subItem, subIndex) => (
                      <a key={subIndex} href={subItem.href} className="block px-4 py-2 text-gray-600 hover:bg-gray-100">{subItem.label}</a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex justify-center space-x-7 items-center">
            <a href="#" className="text-xl py-2 px-5 border rounded-md font-semibold bg-[#7abbe6] hover:bg-sky-500 text-white">Log in</a>
            <a href="#" className="text-xl py-2 px-5 border rounded-md font-semibold text-white bg-[#3a9bdc] hover:bg-sky-500">Sign up</a>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
