import { Route, Routes } from 'react-router-dom';
import AuthRoute from '@/components/AuthRoute';
import Layout from '@/pages/Layout';
import Login from '@/pages/Login';
import './App.css'

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={
          <AuthRoute>
            <Layout />
          </AuthRoute>
        } />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}
