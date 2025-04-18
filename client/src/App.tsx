import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar, Sidebar } from './components';
import { Analytics } from '@vercel/analytics/react';
import Footer from './components/Footer';

const Home = React.lazy(() => import('./pages/Home'));
const CampaignDetails = React.lazy(() => import('./pages/CampaignDetails'));
const CreateCampaign = React.lazy(() => import('./pages/CreateCampaign'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profile = React.lazy(() => import('./pages/Profile'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const LearnMore = React.lazy(() => import('./pages/LearnMore'));

const App = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  if (isHomePage) {
    return (
      <Suspense fallback={<div className='text-white'>Loading...</div>}>
        <div className='relative bg-black-bg min-h-screen flex flex-row'>
          <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto'>
            <Home />
          </div>
        </div>
        <Analytics />
      </Suspense>
    );
  }

  return (
    <div className='relative sm:p-8 p-4 bg-black-bg min-h-screen flex flex-row'>
      <div className='sm:flex hidden mr-10 relative'>
        <Sidebar />
      </div>

      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <Navbar />

        <Suspense fallback={<div className='text-white'>Loading...</div>}>
          <Routes>
            <Route
              path='/dashboard'
              element={<Dashboard />}
            />
            <Route
              path='/profile'
              element={<Profile />}
            />
            <Route
              path='/create-campaign'
              element={<CreateCampaign />}
            />
            <Route
              path='/campaign-details/:id'
              element={<CampaignDetails />}
            />
            <Route
              path='/terms'
              element={<TermsOfService />}
            />
            <Route
              path='/privacy'
              element={<PrivacyPolicy />}
            />
            <Route
              path='/learn-more'
              element={<LearnMore />}
            />
          </Routes>
        </Suspense>

        <Footer />
        <Analytics />
      </div>
    </div>
  );
};

export default App;
