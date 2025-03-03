import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { ChatProvider } from "./hooks/ChatContext";
import { Toaster } from "react-hot-toast";
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AuthRedirect() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <Toaster />
        <Router>
          <AuthRedirect /> {/* Xử lý điều hướng khi đăng nhập */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<PrivateRoute children={<Homepage/>} />} />
            {/* <Route path="/home" element={<Homepage/>}/> */}
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </Router>
      </ChatProvider>
    </AuthProvider>
   
  );
}

export default App;
