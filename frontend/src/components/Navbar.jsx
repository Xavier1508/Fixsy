import React, {useState} from 'react';
import { navItems } from '../constant/index.jsx'


const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleMouseEnter = (index) => {
    setOpenDropdown(index);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  }

  return (
    <nav className="sticky bg-white/65 top-0 z-50 py-3 shadow-xl backdrop-blur-lg border-b border-neutral-700/30 h-20">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-3" src="/logo.png" alt="Fixsy Logo" />
            <span className="font-bold text-xl tracking-tight text-[#05668d]">Fixsy</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index} className= "relative" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                <a href={item.href} className="text-gray-600 font-medium hover:text-green-600 flex items-center">{item.label}{item.submenu && (<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>)}</a>
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
            <a href="#" className="text-xl py-2 px-5 border rounded-full font-semibold bg-sky-500 hover:bg-sky-800 text-white">Log in</a>
            <a href="#" className="text-xl py-2 px-5 border rounded-full font-semibold text-[#427aa1] hover:bg-sky-500 hover:text-white">Sign up</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
