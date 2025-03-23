import Navigation from './components/Navigation'
import { AuthProvider } from './contexts/AuthContext';
import { Route, Routes } from 'react-router';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import DashboardPage from './pages/DashboardPage';
import EditProfilePage from './pages/EditProfilePage';
import AcademyPage from './pages/AcademyPage';

function App() {
  return (
    <>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path='/academy/:id' element={<AcademyPage />} />
          <Route element={<PrivateRoute />}>
            <Route path='/my-profile' element={<ProfilePage />} />
            <Route path='/edit-profile' element={<EditProfilePage />} />
            <Route path='/dashboard' element={<DashboardPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
