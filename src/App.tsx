import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import RabbitCursor from './components/RabbitCursor';
import HomePage from './pages/HomePage';
import WorkDetailPage from './pages/WorkDetailPage';
import RabbitPreviewPage from './pages/RabbitPreviewPage';
import './styles/variables.css';
import './App.css';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {!loaded && <Loading onComplete={() => setLoaded(true)} />}

      {loaded && (
        <>
          <Navbar />
          <RabbitCursor />
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/works/:id" element={<WorkDetailPage />} />
                <Route path="/rabbit-preview" element={<RabbitPreviewPage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </>
  );
}
