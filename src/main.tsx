import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from './Layout.tsx';
import {
  ProtectedHomePage,
  ProtectedLibraryPage,
  ProtectedProfilePage,
  ProtectedNotificationPage,
  ProtectedBookDetailPage,
  ProtectedSearchResultPage,
  PublicLoginPage,
  PublicRegisterPage,
} from './middleware/ProtectedRoutes.tsx';

const router = createBrowserRouter([
  {
    path: '/login',
    Component: PublicLoginPage,
  },
  {
    path: '/register',
    Component: PublicRegisterPage,
  },
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: ProtectedHomePage,
      },
      {
        path: '/library',
        Component: ProtectedLibraryPage,
      },
      {
        path: '/notifications',
        Component: ProtectedNotificationPage,
      },
      {
        path: '/profile',
        Component: ProtectedProfilePage,
      },
    ],
  },
  {
    path: '/books/:id',
    Component: ProtectedBookDetailPage,
  },
  {
    path: '/search',
    Component: ProtectedSearchResultPage,
  },
  {
    path: '*',
    Component: () => <Navigate to="/login" replace />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

