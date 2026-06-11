import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Overview from './components/overview/overview';
import { lazy } from 'react';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
// Lazy load pages that aren't needed on first render

const Clinicians = lazy(() => import('./pages/Clinicians'));
const Patients = lazy(() => import('./pages/Patients'));
const Visits = lazy(() => import('./pages/Visits'));

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Overview />} />
            <Route path="clinicians" element={<Clinicians />} />
            <Route path="patients" element={<Patients />} />
            <Route path="visits" element={<Visits />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;