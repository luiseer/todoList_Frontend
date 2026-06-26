import React from 'react';
import { Link } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import useAuth from '../hooks/useAuth';

import Search from './Search';

const Header = () => {
  const { handleSearch, logOutProjects } = useProjects();
  const { logOutAuth } = useAuth();

  const handleLogOut = () => {
    logOutAuth();
    logOutProjects();
    localStorage.removeItem('token');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[73px]">
          <Link to="/projects" className="text-3xl font-black gradient-text flex-shrink-0">
            UpTask
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <button
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-600 
                         rounded-xl hover:bg-slate-100 transition-colors duration-200"
              type="button"
              onClick={handleSearch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>

            <Link
              to="/projects"
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-600 
                         rounded-xl hover:bg-slate-100 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              Projects
            </Link>

            <button
              type="button"
              onClick={handleLogOut}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white 
                         bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl
                         hover:from-indigo-700 hover:to-indigo-600 hover:shadow-lg hover:shadow-indigo-200
                         transition-all duration-200 ml-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log out
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              className="p-2 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
              type="button"
              onClick={handleSearch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleLogOut}
              className="btn-primary !px-3 !py-2 text-xs"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
      <Search />
    </header>
  );
};

export default Header;
