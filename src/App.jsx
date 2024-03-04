import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import TVSeries from "./pages/TVseries";
import Bookmark from './pages/Bookmark'

function ProtectedRoute({ children, redirectTo = "/login", isAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo]);

  return isAuthenticated ? children : null;
}

function App() {
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const previousLocation = useRef(location);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData && storedUserData.email && storedUserData.password) {
      setUserData(storedUserData);
    }
  }, []);

  useEffect(() => {
    previousLocation.current = location;
  }, [location]);

  const navigateBack = () => {
    navigate(previousLocation.current.pathname);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login setUserData={setUserData} />} />
      <Route path="/register" element={<Register setUserData={setUserData} />} />
      <Route path="/movie" element={<Movie />} />
      <Route path="/tvseries" element={<TVSeries />} />
      <Route path="/bookmarks" element={<Bookmark />} />
      <Route
        path="/"
        element={
          <ProtectedRoute isAuthenticated={userData !== null} redirectTo="/login">
            <Home userData={userData} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
