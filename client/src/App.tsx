import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar, Sidebar } from './components';
import { Home } from './pages';
import { Analytics } from '@vercel/analytics/react';

const isProd = import.meta.env.MODE !== 'production';

const CampaignDetails = React.lazy(() => import('./pages/CampaignDetails'));
const CreateCampaign = React.lazy(() => import('./pages/CreateCampaign'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profile = React.lazy(() => import('./pages/Profile'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const LearnMore = React.lazy(() => import('./pages/LearnMore'));

const App = () => {
  const pathName = useLocation().pathname;

  if (pathName === '/') {
    return (
      <Suspense fallback={<div className='text-white'>Loading...</div>}>
        <Home />
        {isProd && <Analytics />}
      </Suspense>
    );
  }
  return (
    <div
      className='relative sm:p-8 p-4 bg-black-bg
        min-h-screen flex flex-row'
    >
      <div className='sm:flex hidden mr-10 relative'>
        <Sidebar />
      </div>

      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <Navbar />

        <Suspense fallback={<div className='text-white'>Loading...</div>}>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
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
        {isProd && <Analytics />}
      </div>
    </div>
  );
};

export default App;
