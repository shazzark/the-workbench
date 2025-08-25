import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";
import Applayout from "./pages/Applayout";
import ContactPage from "./pages/ContactPage";
import PageNotFound from "./pages/PageNotFound";
import AddprojectPage from "./pages/AddprojectPage";
import { ThemeProvider } from "./context/TheameProvider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/common/ProtectedRoutes";
import { AuthProvider } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import SignoutPage from "./pages/SignoutPage";
import EditProject from "./components/projectPagecomponent/EditProject";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
// import { ThemeProvider } from "./context/TheameProvider";

function App() {
  return (
    <div>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Applayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="projects" element={<ProjectPage />} />
                <Route path="projects/add" element={<AddprojectPage />} />
                <Route path="projects/:id" element={<ProjectDetailsPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="edit-project/:id" element={<EditProject />} />
              </Route>

              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="signout" element={<SignoutPage />} />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#10B981",
                secondary: "#fff",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "#EF4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </AuthProvider>
    </div>
  );
}

export default App;
