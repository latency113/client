import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/Home";
import Concert from "./pages/Concert";
import Artist from "./pages/Artitst";
import Product from "./pages/Product";
import News from "./pages/News";
import Profile from "./pages/user/Profile";
import ConcertDetail from "./pages/concertPages/concertDetail";
import Dashboard from "./pages/admin/Dashboard";
import AdminConcert from "./pages/admin/Concert";
import User from "./pages/admin/User";
import Booking from "./pages/user/Booking";
import NotFound from "./pages/NotFound";
import EditConcert from "./pages/admin/components/EditConcert";
import AdminRoute from "./pages/admin/components/AdminRoute";
import SearchResults from "./pages/SearchResults";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/concert" element={<Concert />} />
        <Route path="/artist" element={<Artist />} />
        <Route path="/products" element={<Product />} />
        <Route path="/news" element={<News />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/concert/:id" element={<ConcertDetail />} />
        <Route path="/user/tickets" element={<Booking />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="admin/concert"
          element={
            <AdminRoute>
              <AdminConcert />
            </AdminRoute>
          }
        />
        <Route
          path="admin/edit-concert/:id"
          element={
            <AdminRoute>
              <EditConcert />
            </AdminRoute>
          }
        />
        <Route
          path="admin/users"
          element={
            <AdminRoute>
              <User />
            </AdminRoute>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
