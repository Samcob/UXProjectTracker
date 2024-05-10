import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProjectPage from './pages/ProjectPage';
import UserPage from './pages/UserPage';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<NotFoundPage />} path="*" />
        <Route element={<ProjectPage />} path="/ProjectPage" />
        <Route element={<UserPage />} path="/UserPage" />
      </Routes>
    </Router>
  );
};
