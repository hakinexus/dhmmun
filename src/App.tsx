/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import { ThemeProvider } from './context/ThemeContext';
import SkeletonLoader from './components/SkeletonLoader';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Committees = lazy(() => import('./pages/Committees'));
const Registration = lazy(() => import('./pages/Registration'));

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <CustomCursor />
        <div className="noise-overlay"></div>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <Suspense fallback={<SkeletonLoader variant="home" />}>
                <Home />
              </Suspense>
            } />
            <Route path="about" element={
              <Suspense fallback={<SkeletonLoader variant="about" />}>
                <About />
              </Suspense>
            } />
            <Route path="committees" element={
              <Suspense fallback={<SkeletonLoader variant="committees" />}>
                <Committees />
              </Suspense>
            } />
            <Route path="registration" element={
              <Suspense fallback={<SkeletonLoader variant="registration" />}>
                <Registration />
              </Suspense>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
