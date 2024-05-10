import dhaLogo from '/src/assets/dha-white.png';
import SearchBar from '../Search/SearchBar';

import { Bars3Icon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

const primaryNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'Other Home', href: '/param/primary2' },
  { name: 'No Place Like Home', href: '/param/primary3' },
];

interface IAppbarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AppBar = ({ isOpen, setIsOpen }: IAppbarProps) => {
  return (
    <>
      <div className="sticky top-0 flex items-center justify-between bg-primary-color pb-4 pl-4 pt-4">
        <div className=" flex items-center justify-start">
          <img src={dhaLogo} alt="DHA Logo" className="h-12 md:mr-4 md:block" />
          <h1 className="text-base font-semibold text-white md:text-2xl">UX Project Tracker</h1>
        </div>
        <div className="pr-4 md:flex md:items-center">
          <div className="mr-12 hidden md:flex md:flex-col">
            <div>
              <SearchBar />
            </div>
            <nav className="pt-2" aria-label="Appbar Navigation">
              {primaryNavLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.href}
                  className={({ isActive }) =>
                    `mx-2 w-fit border-b-2 border-primary-color p-2 font-bold text-white hover:border-b-secondary-font-color hover:font-bold  ${
                      isActive ? 'border-secondary-font-color' : ''
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
          <div>
            <button className-="flex-none " onClick={() => setIsOpen(!isOpen)}>
              <Bars3Icon className="h-10 w-10 stroke-white" />
              <div className=" text-s w-full text-center font-medium capitalize text-secondary-font-color">
                Menu
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppBar;
