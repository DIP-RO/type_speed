
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <div className="navbar">
      <div className="navbar-start sm:mx-16 sm:flex sm:flex-row-reverse sm:justify-between sm:gap-24">
        <div className="drawer lg:hidden">
          <input
            id="my-drawer"
            type="checkbox"
            className="drawer-toggle"
            checked={isDrawerOpen}
            onChange={toggleDrawer}
          />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn drawer-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
          <div className={`drawer-side ${isDrawerOpen ? "open" : ""}`}>
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
              onClick={toggleDrawer}
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
            <Link to="/privacy">Privacy & Safety</Link>
          </li>
          <li>
            <Link to="/disclaimer">Disclaimer</Link>
          </li>
          <li>
            <Link to="/terms">Terms & Condition</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
              <li>
                <a className="btn" onClick={toggleDrawer}>
                  Close
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row items-center">
        <Link to="/" className="btn btn-ghost text-xl">
          <img
            className="w-36 h-auto lg:mr-96 lg:w-44 lg:h-auto"
            src="https://i.ibb.co/n8RNP6c/mrtyper-logo-1.png"
            alt="Logo"
          />
        </Link>
          <div className="ml-2">
            <h3 className="text-2xl font-semibold"></h3>
                  </div>
              
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/privacy">Privacy & Safety</Link>
          </li>
          <li>
            <Link to="/disclaimer">Disclaimer</Link>
          </li>
          <li>
            <Link to="/terms">Terms & Condition</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        
        </ul>
      </div>
    </div>
  );
};

export default NavBar;

