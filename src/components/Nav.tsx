import { useState, useEffect } from 'react';
import ImageTag from './ImageTag';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const Nav = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  // Close menu when clicking outside or pressing escape //
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSideNavOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (sideNavOpen && !(e.target as HTMLElement).closest('.mobile-nav-container')) {
        setSideNavOpen(false);
      }
    };
    if (sideNavOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [sideNavOpen]);

  const handleLinkClick = () => {
    setSideNavOpen(false);
  };

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between relative">
      <Link to="/" className="flex items-center pl-0.5 z-50">
        <ImageTag src="/logo.png" className="rounded-lg" alt="logo" width={36} height={36} />
      </Link>
      {/* Mobile */}
      <div className="md:hidden mobile-nav-container">
        <div
          className="cursor-pointer p-2 z-50 relative"
          onClick={() => setSideNavOpen((prev) => !prev)}
          aria-label={sideNavOpen ? 'Close menu' : 'Open menu'}
        >
          {sideNavOpen ? (
            <ImageTag src="/close.svg" alt="close" width={28} height={28} />
          ) : (
            <ImageTag src="/menu.svg" alt="menu" width={28} height={28} />
          )}
        </div>
        {/* Backdrop */}
        <div
          className={`fixed inset-0  bg-opacity-50 z-40 transition-opacity duration-300 ${
            sideNavOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={() => setSideNavOpen(false)}
        />
        {/* Slide Menu */}
        <div
          className={`fixed top-0 right-0 w-80 max-w-[80vw] h-full bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
            sideNavOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col items-center pt-20 gap-8 font-medium text-lg">
            <Link
              to="/"
              className="a-jix hover:text-blue-600 transition-colors py-2"
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <Link
              to="/trending"
              className="a-jix hover:text-blue-600 transition-colors py-2"
              onClick={handleLinkClick}
            >
              Trending
            </Link>
            <Link
              to="/about"
              className="a-jix hover:text-blue-600 transition-colors py-2"
              onClick={handleLinkClick}
            >
              About
            </Link>
            <SignedOut>
              <Link to="/login" onClick={handleLinkClick}>
                <button className="bg-jix hover:opacity-90 transition-opacity py-2 px-6 rounded">
                  Login
                </button>
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="mt-4">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/" className="a-jix hover:text-blue-600 transition-colors">
          Home
        </Link>
        <Link to="/trending" className="a-jix hover:text-blue-600 transition-colors">
          Trending
        </Link>
        <Link to="/about" className="a-jix hover:text-blue-600 transition-colors">
          About
        </Link>
        <SignedOut>
          <Link to="/login">
            <button className="bg-jix hover:opacity-90 transition-opacity">Login</button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Nav;
