import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ProjectsProvider } from './context/ProjectsProvider';

import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPass from './pages/ForgotPass';
import NewPass from './pages/NewPass';
import ConfirmAccount from './pages/ConfirmAccount';
import ProtectedRoute from './layouts/ProtectedRoute';
import Projects from './pages/Projects';
import Project from './pages/Project';
import NewProject from './pages/NewProject';
import EditProject from './pages/EditProject';
import NewCollaborator from './pages/NewCollaborator';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPass />} />
              <Route path="forgot-password/:token" element={<NewPass />} />
              <Route path="confirm/:id" element={<ConfirmAccount />} />
            </Route>
            <Route path="/projects" element={<ProtectedRoute />}>
              <Route index element={<Projects />} />
              <Route path="create-project" element={<NewProject />} />
              <Route
                path="new-collaborator/:id"
                element={<NewCollaborator />}
              />
              <Route path=":id" element={<Project />} />
              <Route path="edit/:id" element={<EditProject />} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
