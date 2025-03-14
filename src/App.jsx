import { useState } from 'react'
import Navigation from './components/Navigation'
import Header from './components/Header';
import LoginModal from './components/LoginModal';

function App() {
  return (
    <>
      <Navigation />
      <Header />
      <LoginModal />
    </>
  )
}

export default App
