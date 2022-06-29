import { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { LoginPanel } from "./components/LoginPanel";

import { UsersProvider } from "./hooks/useUsers";

interface PrivateRouteProps {
  children?: ReactNode;
  redirectTo: string;
}

const PrivateRoute = ({ children, redirectTo }: PrivateRouteProps) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  console.log("isAuth:", isAuthenticated);

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export function App() {
  return (
    <UsersProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <PrivateRoute redirectTo="/">
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<LoginPanel />} />
        </Routes>
      </BrowserRouter>
    </UsersProvider>
  );
}
