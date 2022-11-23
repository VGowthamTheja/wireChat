import React, { useContext, useMemo } from "react";
import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Loading from "./screens/Loading";

function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }: { children: any }) => {
    if (!currentUser) {
      return <Loading isLoading />;
    }
    return children;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={<Loading isLoading={currentUser ? true : false} />}
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
