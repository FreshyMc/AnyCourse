import { useState } from 'react'
import Navigation from './components/Navigation'
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <Navigation />
        <Header />
      </AuthProvider>
    </>
  )
}

export default App
