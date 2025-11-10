
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} Valentina Tudose Relationship Coach. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
