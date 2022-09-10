import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

function App() {
  const { user } = useSelector((state: any) => state.todos);
  return (
    <BrowserRouter>
      <Box>
        <Routes>
          {
            user ? (
              <>
                <Route path="/" element={<></>} />
                <Route path="/todo/:id" element={<></>} />
              </>
            ) : (
              <>
              <Route path="/" element={<></>} />
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
