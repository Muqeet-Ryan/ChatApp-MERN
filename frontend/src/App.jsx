import { Routes,Route } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
const App = () => {
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
       <Routes>
           <Route path="/signup" element={<SignUpPage/>} />
           <Route path="/login" element={<LoginPage/>} />
           <Route path="/" element={<ChatPage/>} />
      </Routes>
  </div>

  );
};

export default App;
