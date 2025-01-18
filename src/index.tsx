import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/AppPage/App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './middlewares/PrivateRoute';



const root = ReactDOM.createRoot(
  document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);