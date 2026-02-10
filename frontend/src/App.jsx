import { Routes, Route, Navigate } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import {Toaster} from 'react-hot-toast'

const App = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      <Routes>
        <Route
          path="/"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Toaster/>
    </div>
  );
};

export default App;
