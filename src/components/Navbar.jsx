import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    /* Added relative here to ensure absolute children position correctly */
    <nav className="flex items-center justify-between px-6 lg:px-20 py-5 lg:py-7 sticky top-0 z-[999] bg-[#05080a] border-b border-white/5">
      <div className="flex items-center gap-3">
        <img
          src="/assets/logo.png"
          alt="SkillCoders"
          className="h-8 md:h-12 w-auto"
        />
        <span className="text-xl md:text-2xl font-black tracking-tighter uppercase italic text-white">
          Skill<span className="text-[#00ff99]">Coders</span>
        </span>
      </div>

      {/* --- MODIFIED LOGIC: FORCED VISIBILITY --- */}
      <div
        className={`
          ${isMenuOpen ? 'flex' : 'hidden'} 
          lg:flex flex-col lg:flex-row 
          absolute lg:relative 
          top-full left-0 w-full lg:w-auto 
          bg-[#05080a] lg:bg-transparent 
          p-10 lg:p-0 gap-8 lg:gap-10 
          text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 
          border-b lg:border-none border-white/10 shadow-2xl lg:shadow-none
        `}
        style={{ minHeight: isMenuOpen ? 'auto' : '0' }} // Ensures container has height when open
      >
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[#00ff99]">Home</Link>
        <Link to="/courses" onClick={() => setIsMenuOpen(false)} className="hover:text-[#00ff99]">Courses</Link>
        <Link to="/gadgets" onClick={() => setIsMenuOpen(false)} className="hover:text-[#00ff99]">Gadgets</Link>
        <Link to="/websites" onClick={() => setIsMenuOpen(false)} className="hover:text-[#00ff99]">Websites</Link>
        <Link to="/career" onClick={() => setIsMenuOpen(false)} className="hover:text-[#00ff99]">Career</Link>
      </div>

      <div className="flex items-center gap-5">


        {/* Ensure this button has a high z-index to stay clickable */}
        <button
          onClick={() => {
            console.log("Menu state before:", isMenuOpen); // Check your console to see if this triggers!
            setIsMenuOpen(!isMenuOpen);
          }}
          className="lg:hidden text-[#00ff99] text-2xl z-[1001] relative"
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;