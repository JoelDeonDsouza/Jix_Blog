import Nav from '../components/Nav';
import { Outlet } from 'react-router-dom';

const NavLayout = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64">
      <Nav />
      <Outlet />
    </div>
  );
};

export default NavLayout;
