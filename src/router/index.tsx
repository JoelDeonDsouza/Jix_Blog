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
        path: '/:slug',
        element: <BlogLists />,
      },
      {
        path: '/blog/:id',
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
