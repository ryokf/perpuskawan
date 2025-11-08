import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './pages/HomePage.tsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import LibraryPage from './pages/LibraryPage.tsx';
import Layout from './Layout.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import NotificationPage from './pages/NotificationPage.tsx';
import BookDetailPage from './pages/BookDetailPage.tsx';
import SearchResultPage from './pages/SearchResultPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: '/library',
        Component: LibraryPage,
      },
      {
        path: '/notifications',
        Component: NotificationPage,
      },
      {
        path: '/profile',
        Component: ProfilePage,
      },
    ],
  },
  {
    path: '/books/:id',
    Component: BookDetailPage,
  },
  {
    path: '/search',
    Component: SearchResultPage,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

