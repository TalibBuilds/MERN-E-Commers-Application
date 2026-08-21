import { Suspense, lazy, useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import MenuFooter from './components/MenuFooter'
import ScrollToTop from '../src/customHooks/ScrollToTop'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'

// 1. IMPORT LENIS MODULES
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

// hook***
import useCurrentUser from './customHooks/useCurrentUser'

// initial load animation***
const InitialLoader = lazy(() => import('./components/InitialLoader'))

// lasy load component***
const LadingPage = lazy(() => import('./pages/LadingPage'))
const About = lazy(() => import('./pages/About'))
const Orders = lazy(() => import('./pages/Orders'))
const Payment = lazy(() => import('./pages/Payment'))
const Menu = lazy(() => import('./pages/Menu'))
const Profile = lazy(() => import('./pages/Profile'))
const Register = lazy(() => import('./pages/Register'))
const Login = lazy(() => import('./pages/Login'))
const Footer = lazy(() => import('./components/Footer'))

// admin pages
const UploadFood = lazy(() => import('./pages/adminpages/UploadFood'))


const ProtectedRoute = ({ currentUser, children, requireAdmin = false }) => {
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && currentUser.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}

// 2. CREATE A ROUTE TRANSTION HELPER COMPONENT
// This forces Lenis to instantly recalculate page heights when routes switch
const LenisRouteSync = () => {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      // Instantly jump to top on path change to avoid awkward scroll animations during routing
      lenis.scrollTo(0, { immediate: true });
      // Recalculate dimensions for the new lazy-loaded page
      lenis.resize();
    }
  }, [location.pathname, lenis]);

  return null;
};

const App = () => {
  // Fetch current user when app starts
  const currentUser = useSelector((state) => state.user.currentUser)
  useCurrentUser();
  const location = useLocation();

  // show the branded intro once, then reveal the real app***
  const [showIntro, setShowIntro] = useState(true)

  if (showIntro) {
    return <InitialLoader onDone={() => setShowIntro(false)} />
  }

  // 3. WRAP THE RENDERED RETURN WITH <ReactLenis root>
  return (
    <ReactLenis root options={{ duration: 2, lerp: 0.1 }}>
      <LenisRouteSync />
      <div className="relative">
        <Toaster position="top center" reverseOrder={false} />

        {/* in profile Navbar not show ** */}
        {!['/profile','/orders','/payment','/about'].some(path => location.pathname.startsWith(path))&&<Navbar />}

        {/* Note: Your custom ScrollToTop hook might conflict with Lenis. 
            If page jumps feel broken, remove <ScrollToTop /> since LenisRouteSync handles it. */}
        <ScrollToTop />

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<LadingPage />} />
            <Route path='/about' element={<About />} />
            <Route path='/orders' element={<Orders />} />
            <Route
              path='/payment'
              element={
                <ProtectedRoute currentUser={currentUser}>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route path='/menu' element={<Menu />} />
            <Route path='/profile' element={<Profile />} />

            <Route path='/register' element={!currentUser ? <Register /> : <Navigate to="/" />} />
            <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />

            {/* ADMIN ACCESS ROUTEs */}
            <Route
              path="/admin/upload-food"
              element={
                <ProtectedRoute currentUser={currentUser} requireAdmin={true}>
                  <UploadFood />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>

        <MenuFooter />
        <Footer />
      </div>
    </ReactLenis>
  )
}

export default App
