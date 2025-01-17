import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { themeSettings } from 'theme';
import Dashboard from 'scenes/Dashboard';
import Layout from 'scenes/Layout';
import Products from 'scenes/Products';
import Customers from 'scenes/Customers';
import Transactions from 'scenes/Transactions';
import Overview from 'scenes/Overview';
import Daily from 'scenes/Daily';
import Monthly from 'scenes/Monthly';
import Breakdown from 'scenes/Breakdown';
import Admin from 'scenes/Admin';
import Performance from 'scenes/Performance';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className='app'>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Navigate to='/dashboard' replace />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/products' element={<Products />} />
              <Route path='/customers' element={<Customers />} />
              <Route path='/transactions' element={<Transactions />} />
              <Route path='/overview' element={<Overview />} />
              <Route path='/daily' element={<Daily />} />
              <Route path='/monthly' element={<Monthly />} />
              <Route path='/breakdown' element={<Breakdown />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/performance' element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
