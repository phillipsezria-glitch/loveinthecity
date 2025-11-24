import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { ErrorBoundary } from './components/ErrorBoundary';
import { preloadResources, setupImageLazyLoading } from './utils/lazyLoad';
import { initializeDeepLinks, getDeepLinkManager } from './utils/deepLinks';
import { storage } from './utils/localStorage';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const CommunityPage = lazy(() => import('./pages/CommunityPage').then(module => ({ default: module.CommunityPage })));
const ChoosePage = lazy(() => import('./pages/ChoosePage').then(module => ({ default: module.ChoosePage })));
const HotelPage = lazy(() => import('./pages/HotelPage').then(module => ({ default: module.HotelPage })));
const MinePage = lazy(() => import('./pages/MinePage').then(module => ({ default: module.MinePage })));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage').then(module => ({ default: module.UserProfilePage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));
const SignupPage = lazy(() => import('./pages/SignupPage').then(module => ({ default: module.SignupPage })));
const VipPage = lazy(() => import('./pages/VipPage').then(module => ({ default: module.VipPage })));
const MessagesPage = lazy(() => import('./pages/MessagesPage').then(module => ({ default: module.MessagesPage })));
const AdminLogin = lazy(() => import('./pages/AdminLogin').then(module => ({ default: module.AdminLogin })));
const PartnersPage = lazy(() => import('./pages/PartnersPage').then(module => ({ default: module.PartnersPage })));
const SuccessStoriesPage = lazy(() => import('./pages/SuccessStoriesPage').then(module => ({ default: module.SuccessStoriesPage })));

// Loading component
const PageLoader = () => (
  <div className="min-h-full bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-500 text-sm">Loading...</p>
    </div>
  </div>
);

// Layout component to handle conditional rendering of BottomNav
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  // Hide nav on login, menjet, and detailed user profile pages
  const hideNavPaths = ['/login', '/vip', '/messages', '/menjet'];
  const isUserProfile = location.pathname.startsWith('/user/');
  const showNav = !hideNavPaths.includes(location.pathname) && !isUserProfile;

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto bg-gray-50 shadow-2xl overflow-hidden relative font-sans">
      <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide relative bg-gray-50">
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
};

// Deep link router component
const DeepLinkRouter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Simulate session check and initialize deep links
  useEffect(() => {
    const token = storage.get<string>('funloves_token');
    const authenticated = !!token;
    if (authenticated) {
      setIsAuthenticated(true);
    }
    
    // Initialize deep links with navigation callback
    initializeDeepLinks(authenticated, (path: string) => {
      navigate(path);
    });
    
    setIsInitialized(true);
  }, [navigate]);

  const handleLogin = () => {
    storage.set('funloves_token', 'mock_jwt_token');
    setIsAuthenticated(true);
    // Sync deep link manager with new auth state
    getDeepLinkManager().setAuthenticated(true);
  };

  const handleLogout = () => {
    storage.remove('funloves_token');
    setIsAuthenticated(false);
    // Sync deep link manager with new auth state
    getDeepLinkManager().setAuthenticated(false);
  };

  if (!isInitialized) {
    return null;
  }

  // Render admin login without layout
  if (location.pathname === '/menjet') {
    return (
      <Routes>
        <Route path="/menjet" element={
          <AdminLogin />
        } />
      </Routes>
    );
  }

  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/signup" element={
            isAuthenticated ? <Navigate to="/" replace /> : <SignupPage />
          } />

          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />
          } />
          
          <Route path="/" element={
            isAuthenticated ? <HomePage /> : <Navigate to="/signup" replace />
          } />
          
          <Route path="/community" element={
            isAuthenticated ? <CommunityPage /> : <Navigate to="/signup" replace />
          } />
          
          <Route path="/choose" element={
            isAuthenticated ? <ChoosePage /> : <Navigate to="/signup" replace />
          } />
          
          <Route path="/hotel" element={
            isAuthenticated ? <HotelPage /> : <Navigate to="/signup" replace />
          } />
          
          <Route path="/mine" element={
            isAuthenticated ? <MinePage onLogout={handleLogout} /> : <Navigate to="/signup" replace />
          } />

           <Route path="/vip" element={
            isAuthenticated ? <VipPage /> : <Navigate to="/signup" replace />
          } />
          
           <Route path="/messages" element={
            isAuthenticated ? <MessagesPage /> : <Navigate to="/signup" replace />
          } />

          <Route path="/partners" element={
            isAuthenticated ? <PartnersPage /> : <Navigate to="/signup" replace />
          } />

          <Route path="/stories" element={
            isAuthenticated ? <SuccessStoriesPage /> : <Navigate to="/signup" replace />
          } />

          <Route path="/user/:id" element={
            isAuthenticated ? <UserProfilePage /> : <Navigate to="/signup" replace />
          } />
          
          {/* Catch all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default function App() {
  useEffect(() => {
    // Preload critical resources on app startup
    preloadResources();
    
    // Setup lazy loading for images
    const imageObserver = setupImageLazyLoading();
    
    // Observe all images with lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Cleanup
    return () => {
      lazyImages.forEach(img => imageObserver.unobserve(img));
    };
  }, []);

  return (
    <ErrorBoundary>
      <HashRouter>
        <DeepLinkRouter />
      </HashRouter>
    </ErrorBoundary>
  );
}