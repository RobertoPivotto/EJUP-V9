import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import CartDrawer from '@/components/cart/CartDrawer';
import { useScrollToTop } from '@/hooks/useScrollToTop';

// Import pages
import Index from './pages/Index';
import Courses from './pages/Courses';
import AllArticles from './pages/AllArticles';
import AllPodcasts from './pages/AllPodcasts';
import PodcastDetail from './pages/PodcastDetail';
import Creator from './pages/Creator';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyCourses from './pages/MyCourses';
import InternalCourses from './pages/InternalCourses';
import CourseDetails from "./pages/CourseDetails";
import CourseLearn from "./pages/CourseLearn";
import Checkout from "./pages/Checkout";
import WriteArticle from "./pages/WriteArticle";
import ArticleDetail from "./pages/ArticleDetail";
import AccountSettings from "./pages/AccountSettings";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";

// Admin Pages
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import CourseManagement from "./pages/Admin/CourseManagement";
import NewCourse from "./pages/Admin/NewCourse";
import CourseView from "./pages/Admin/CourseView";
import EditCourse from "./pages/Admin/EditCourse";
import StudentView from "./pages/Admin/StudentView";
import UserManagement from "./pages/Admin/UserManagement";
import ArticleManagement from "./pages/Admin/ArticleManagement";

// Content Pages
import ContentHub from "./pages/ContentHub";

// Instructor Pages
import InstructorCourseView from "./pages/Instructor/CourseView";

function App() {
  // Hook para scroll to top em mudanças de rota
  useScrollToTop();

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/courses/:id/learn" element={<CourseLearn />} />
        
        {/* School Routes */}
        <Route path="/schools/:schoolId" element={<Courses />} />
        <Route path="/content" element={<Navigate to="/content/articles" replace />} />
        <Route path="/content/articles" element={<AllArticles />} />
        <Route path="/content/podcast" element={<AllPodcasts />} />
        <Route path="/content/blog/:id" element={<ArticleDetail />} />
        <Route path="/content/podcast/:id" element={<PodcastDetail />} />
        <Route path="/creator" element={<Creator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/faq" element={<FAQ />} />
        
        {/* Internal Routes */}
        <Route path="/dashboard" element={<Navigate to="/my-courses" replace />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/internal/courses" element={<InternalCourses />} />
        <Route path="/write-article" element={<WriteArticle />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/courses" element={<CourseManagement />} />
        <Route path="/admin/courses/new" element={<NewCourse />} />
        <Route path="/admin/courses/:id" element={<CourseView />} />
        <Route path="/admin/courses/:id/edit" element={<EditCourse />} />
        <Route path="/admin/courses/:courseId/students/:studentId" element={<StudentView />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/articles" element={<ArticleManagement />} />
        
        {/* Instructor Routes */}
        <Route path="/instructor/courses/:id" element={<InstructorCourseView />} />
      </Routes>
      <Toaster />
      <CartDrawer />
    </div>
  );
}

export default App;
