import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProjectPage from './pages/ProjectPage';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<NotFoundPage />} path="*" />
        <Route element={<ProjectPage />} path="/ProjectPage" />
      </Routes>
    </Router>
  );
};
