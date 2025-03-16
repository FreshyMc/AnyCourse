import { useState } from 'react'
import Navigation from './components/Navigation'
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path='/my-profile' element={<ProfilePage />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
