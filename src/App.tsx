/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Committees from './pages/Committees';
import Registration from './pages/Registration';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <CustomCursor />
        <div className="noise-overlay"></div>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="committees" element={<Committees />} />
            <Route path="registration" element={<Registration />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
