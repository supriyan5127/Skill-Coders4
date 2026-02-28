import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Gadgets from './pages/Gadgets';
import Websites from './pages/Websites';
import Career from './pages/Career';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/gadgets" element={<Gadgets />} />
          <Route path="/websites" element={<Websites />} />
          <Route path="/career" element={<Career />} />
        </Route>
        <Route path="/admin-hidden" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;