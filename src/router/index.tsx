/**
 * @author: Joel Deon Dsouza
 * @description: Custom hook to provide authentication state using Clerk's useUser hook.
 * Returns loading status, sign-in status, user data, and derived auth flags.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import BlogLists from '../pages/BlogLists';
import Blog from '../pages/Blog';
import CreateBlog from '../pages/CreateBlog';
import NavLayout from '../layouts/NavLayout';

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/blogs',
        element: <BlogLists />,
      },
      {
        path: '/:slug',
        element: <Blog />,
      },
      {
        path: '/create-blog',
        element: <CreateBlog />,
      },
      {
        path: '*',
        element: <div>404 - Page Not Found</div>,
      },
    ],
  },
]);
