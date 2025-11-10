
import React from 'react';
import { AppState } from '../types';

interface HeaderProps {
  appState: AppState;
}

const Header: React.FC<HeaderProps> = ({ appState }) => {
  const isDarkMode = appState === AppState.Results;
  
  return (
    <header className={`${isDarkMode ? 'bg-gray-900' : 'bg-white shadow-sm'} sticky top-0 z-50 transition-colors duration-300`}>
      <div className="container mx-auto px-6 py-4 h-[76px]">
        {/* Branding text removed as requested for a more focused quiz experience */}
      </div>
    </header>
  );
};

export default Header;