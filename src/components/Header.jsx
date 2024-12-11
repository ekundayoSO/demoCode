import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsDropdownOpen(false); // Close dropdown too
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-black text-white flex items-center justify-between p-4 sticky top-0">
      <h1 className="logo">
        <Link to="/home">Ekundayo Sulaimon</Link>
      </h1>
      <button onClick={toggleMenu} className="md:hidden focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          )}
        </svg>
      </button>
      <nav className={`md:block ${isOpen ? 'block' : 'hidden'} transition-all duration-300`}>
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <li className="relative">
            <button onClick={toggleDropdown} className="text-white focus:outline-none">
              Our Services
            </button>
            {isDropdownOpen && (
              <ul className="absolute bg-black text-white rounded-md shadow-lg mt-2 space-y-2 p-2">
                <li>
                  <NavLink
                    to="/projects"
                    onClick={() => {
                      closeMenu();
                      closeDropdown();
                    }}
                    className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}
                  >
                    Projects
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/services"
                    onClick={() => {
                      closeMenu();
                      closeDropdown();
                    }}
                    className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}
                  >
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/consultation"
                    onClick={() => {
                      closeMenu();
                      closeDropdown();
                    }}
                    className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}
                  >
                    Consultation
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/maintenance"
                    onClick={() => {
                      closeMenu();
                      closeDropdown();
                    }}
                    className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}
                  >
                    Maintenance
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <NavLink
              to="/blog"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}
            >
              BlogItem
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/careers"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}
            >
              Careers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/vacancies"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}
            >
              Vacancies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/employees"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}
            >
              People
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/billing"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}
            >
              Billing
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mautic"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}
            >
              Mautic
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
