import HomePage from '../pages/HomePage';
import LibraryPage from '../pages/LibraryPage';
import ProfilePage from '../pages/ProfilePage';
import NotificationPage from '../pages/NotificationPage';
import BookDetailPage from '../pages/BookDetailPage';
import SearchResultPage from '../pages/SearchResultPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import CollectionPage from '../pages/CollectionPage';

// Protected Routes (require authentication)
export const ProtectedHomePage = () => <PrivateRoute Component={HomePage} />;
export const ProtectedLibraryPage = () => <PrivateRoute Component={LibraryPage} />;
export const ProtectedProfilePage = () => <PrivateRoute Component={ProfilePage} />;
export const ProtectedNotificationPage = () => <PrivateRoute Component={NotificationPage} />;
export const ProtectedBookDetailPage = () => <PrivateRoute Component={BookDetailPage} />;
export const ProtectedSearchResultPage = () => <PrivateRoute Component={SearchResultPage} />;
export const ProtectedCollectionPage = () => <PrivateRoute Component={CollectionPage} />;

// Public Routes (redirect to home if already authenticated)
export const PublicLoginPage = () => <PublicRoute Component={LoginPage} />;
export const PublicRegisterPage = () => <PublicRoute Component={RegisterPage} />;
