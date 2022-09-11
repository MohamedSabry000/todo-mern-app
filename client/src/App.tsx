import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import {
  Navbar,
  Login,
  Home,
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
              <Route path="/register" element={<></>} />
              <Route path="/forgot-password" element={<></>} />
              </>
            )
          }
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
