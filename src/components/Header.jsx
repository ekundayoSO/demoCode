import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}>
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}>
              BlogItem
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/service-read-more"
              className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}
            >
              Read more
            </NavLink>
          </li>
          <li>
            <NavLink to="/careers" className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}>
              Careers
            </NavLink>
          </li>{' '}
          <li>
            <NavLink to="/vacancies" className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}>
              Vacancies
            </NavLink>
          </li>
          <li>
            <NavLink to="/people" className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}>
              People
            </NavLink>
          </li>
          <li>
            <NavLink to="/billing" className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}>
              Billing
            </NavLink>
          </li>
          <li>
            <NavLink to="/xp" className={({ isActive }) => (isActive ? 'text-yellow-400' : 'text-white')}>
              Druid XP
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
