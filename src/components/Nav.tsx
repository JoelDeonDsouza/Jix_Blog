import { useState } from 'react';
import ImageTag from './ImageTag';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const Nav = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      <Link to="/" className="flex items-center pl-0.5">
        <ImageTag src="/logo.png" className="rounded-lg" alt="logo" width={36} height={36} />
      </Link>
      {/* Mobile */}
      <div className="md:hidden">
        <div className="cursor-pointer" onClick={() => setSideNavOpen((prev) => !prev)}>
          {sideNavOpen ? (
            <ImageTag src="/close.svg" alt="close" width={28} height={28} />
          ) : (
            <ImageTag src="/menu.svg" alt="menu" width={28} height={28} />
          )}
        </div>
        {/* Menu open */}
        <div
          className={`w-full h-screen flex flex-col items-center absolute top-16 transition-all ease-in-out gap-12 pt-9 font-medium text-lg ${sideNavOpen ? '-right-0' : '-right-100%'}`}
        >
          <Link to="/" className="a-jix">
            Home
          </Link>
          <Link to="/trending" className="a-jix">
            Trending
          </Link>
          <Link to="/about" className="a-jix">
            About
          </Link>
          <SignedOut>
            <Link to="/login">
              <button className="bg-jix">Login</button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium ">
        <Link to="/" className="a-jix">
          Home
        </Link>
        <Link to="/trending" className="a-jix">
          Trending
        </Link>
        <Link to="/about" className="a-jix">
          About
        </Link>
        <SignedOut>
          <Link to="/login">
            <button className="bg-jix">Login</button>
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
