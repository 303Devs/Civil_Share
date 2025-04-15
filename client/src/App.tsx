import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar, Sidebar } from './components';
import {
  CampaignDetails,
  CreateCampaign,
  Dashboard,
  Profile,
  Home,
  TermsOfService,
  PrivacyPolicy,
} from './pages';

const App = () => {
  const pathName = useLocation().pathname;

  if (pathName === '/') {
    return <Home />;
  }
  return (
    <div
      className='relative sm:p-8 p-4 bg-black-bg
        min-h-screen flex flex-row'>
      <div className='sm:flex hidden mr-10 relative'>
        <Sidebar />
      </div>

      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <Navbar />

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
        </Routes>
      </div>
    </div>
  );
};

export default App;
