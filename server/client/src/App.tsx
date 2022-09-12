import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import {
  Navbar,
  Login,
  Home,
  Register,
  ForgotPassword,
  ResetPassword,
} from './components';
import Pages from './components/Pages';

function App() {
  const { user } = useSelector((state: any) => state);
  return (
    <BrowserRouter>
      <Box>
        <Navbar />
        <Routes>
          {
            user ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/todo/:id" element={<></>} />
                <Route path="/:page" element={<Pages />} />
              </>
            ) : (
              <>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset/:id/:token" element={<ResetPassword />} />
              </>
            )
          }
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
