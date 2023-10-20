import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import AdminProvider from './contexts/AdminContext';
import NotFound from './pages/error404'
import AuthGuard from './components/AuthGuard';
import Appointments from './pages/Appointments';
import Conferences from './pages/Conferences';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  // {
  //   path: "/all-requests",
  //   element: <AuthGuard for={'admin'}><AllRequest /></AuthGuard>,
  // },
  {
    path: "/appointments",
    element: <AuthGuard for={'admin'}><Appointments /></AuthGuard>,
  },
  {
    path: "/conferences",
    element: <AuthGuard for={'admin'}><Conferences /></AuthGuard>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AdminProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </AdminProvider>
  </React.StrictMode>,
)
