import logo from './logo.svg';
import './App.css';
import Home from './page/Home';
import Signin from './component/Signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthRoute from './component/AuthRoute';
import BoardPage from './page/BoardPage';
import SocketWrapper from './component/SocketWrapper';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index={false} path='/' element={
          <AuthRoute>
              <Home />
          </AuthRoute>
        } />
        <Route path='/board/:id' element={
          <AuthRoute>
              <SocketWrapper>
                <BoardPage />
              </SocketWrapper>
          </AuthRoute>
        } />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
