import { Route, Routes } from 'react-router-dom';
import AuthRoute from '@/components/AuthRoute';
import Layout from '@/pages/Layout';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Article from '@/pages/Article';
import Publish from '@/pages/Publish';
import './App.css'

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={
          <AuthRoute>
            <Layout />
          </AuthRoute>
        }>
          <Route index element={<Home />} />
          <Route path='article' element={<Article />} />
          <Route path='publish' element={<Publish />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}
