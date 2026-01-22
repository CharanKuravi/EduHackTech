import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";

import LandingPage from "./modules/landing/LandingPage";
import Login from "./modules/auth/pages/Login";
import Learning from "./modules/learning/learning";
import CoursePage from "./modules/learning/coursepage";
import CoursePlayer from "./modules/learning/pages/CoursePlayer";
import HackathonList from "./modules/competition/pages/HackathonList";
import OrganizeHackathon from "./modules/competition/pages/OrganizeHackathon";
import HackathonDetail from "./modules/competition/pages/HackathonDetail";
import PaymentPage from "./modules/learning/pages/PaymentPage";

import AdminDashboard from "./modules/admin/pages/AdminDashboard";
import ManageCourses from "./modules/admin/pages/ManageCourses";
import ManageEvents from "./modules/admin/pages/ManageEvents";
import CourseEditor from "./modules/admin/pages/CourseEditor";
import ManageUsers from "./modules/admin/pages/ManageUsers";
import ManageChallenges from "./modules/admin/pages/ManageChallenges";
import CreateChallenge from "./modules/competition/pages/CreateChallenge";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname.startsWith("/admin");
  const hideFooter =
    location.pathname === "/login" || location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* HOME */}
              <Route path="/" element={<Learning />} />
              <Route path="/learning" element={<Learning />} />

              {/* AUTH */}
              <Route path="/login" element={<Login />} />

              {/* COMPETITION */}
              <Route path="/competition" element={<HackathonList />} />
              <Route path="/competition/organize" element={
                <ProtectedRoute>
                  <OrganizeHackathon />
                </ProtectedRoute>
              } />
              <Route path="/competition/:id" element={<HackathonDetail />} />
              <Route path="/competition/create-challenge" element={
                <ProtectedRoute>
                  <CreateChallenge />
                </ProtectedRoute>
              } />

              {/* LANDING */}
              <Route path="/landing" element={<LandingPage />} />

              {/* LEARNING FLOW */}
              <Route path="/course/:id" element={<CoursePage />} />
              <Route path="/course/:id/learn" element={<CoursePlayer />} />
              <Route path="/payment/:id" element={<PaymentPage />} />

              {/* ========== ADMIN ROUTES ========== */}
              <Route path="/admin" element={
                <ProtectedRoute roles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/courses" element={
                <ProtectedRoute roles={['admin']}>
                  <ManageCourses />
                </ProtectedRoute>
              } />
              <Route path="/admin/courses/:id/editor" element={
                <ProtectedRoute roles={['admin']}>
                  <CourseEditor />
                </ProtectedRoute>
              } />
              <Route path="/admin/events" element={
                <ProtectedRoute roles={['admin']}>
                  <ManageEvents />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute roles={['admin']}>
                  <ManageUsers />
                </ProtectedRoute>
              } />
              <Route path="/admin/challenges" element={
                <ProtectedRoute roles={['admin']}>
                  <ManageChallenges />
                </ProtectedRoute>
              } />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
