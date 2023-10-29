import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.tsx';
import Appointment from './pages/Appointment.tsx';
import Conference from './pages/Conference.tsx';
import { ToastContainer } from 'react-toastify';
import UserProvider from './contexts/UserContext.tsx';
import AllRequests from './pages/AllRequests.tsx';
import Conferences from './pages/Conerences.tsx';
import Appointments from './pages/Appointments.tsx';
import DLTPdfPage from './pages/DLTPdfPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/appointment",
    element: <Appointment/>,
  },
  {
    path: "/conference",
    element: <Conference/>
  },
  {
    path: "/all-requests",
    element: <AllRequests/>
  },
  {
    path: "/conferences",
    element: <Conferences/>
  },
  {
    path: "/appointments",
    element: <Appointments/>
  },
  {
    path: "/dlt-pdf",
    element: <DLTPdfPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
    
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
  </React.StrictMode>,
)
