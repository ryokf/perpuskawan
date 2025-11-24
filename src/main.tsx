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
  ProtectedCollectionPage,
} from './middleware/ProtectedRoutes.tsx';
import AdminRoute from './middleware/AdminRoute.tsx';
import AdminDashboard from './pages/admin/AdminDashboard.tsx';
import AdminBooks from './pages/admin/AdminBooks.tsx';
import AdminUsers from './pages/admin/AdminUsers.tsx';
import AdminCategories from './pages/admin/AdminCategories.tsx';
import AdminWriters from './pages/admin/AdminWriters.tsx';
import AdminLoans from './pages/admin/AdminLoans.tsx';
import AdminReservations from './pages/admin/AdminReservations.tsx';

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
    path: '/admin',
    Component: () => <AdminRoute Component={AdminDashboard} />,
  },
  {
    path: '/admin/books',
    Component: () => <AdminRoute Component={AdminBooks} />,
  },
  {
    path: '/admin/users',
    Component: () => <AdminRoute Component={AdminUsers} />,
  },
  {
    path: '/admin/categories',
    Component: () => <AdminRoute Component={AdminCategories} />,
  },
  {
    path: '/admin/writers',
    Component: () => <AdminRoute Component={AdminWriters} />,
  },
  {
    path: '/admin/loans',
    Component: () => <AdminRoute Component={AdminLoans} />,
  },
  {
    path: '/admin/reservations',
    Component: () => <AdminRoute Component={AdminReservations} />,
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
        path: '/collections',
        Component: ProtectedCollectionPage,
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

