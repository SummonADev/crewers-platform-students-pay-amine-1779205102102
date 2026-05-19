import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from '@/pages/SignUp';
import Dashboard from '@/pages/Dashboard';
import LiveSession from '@/pages/LiveSession';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/session" element={<LiveSession />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
