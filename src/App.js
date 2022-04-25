import { Route, Routes } from 'react-router-dom';
import AuthRoute from '@/components/AuthRoute';
import { lazy, Suspense } from 'react';
import './App.css'

const Layout = lazy(() => import('@/pages/Layout'));
const Login = lazy(() => import('@/pages/Login'));
const Home = lazy(() => import('@/pages/Home'));
const Article = lazy(() => import('@/pages/Article'));
const Publish = lazy(() => import('@/pages/Publish'));

export default function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div
            style={{
              textAlign: 'center',
              marginTop: 200
            }}
          >
            loading...
          </div>
        }
      >
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
      </Suspense>
    </div>
  );
}
