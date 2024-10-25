import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/authentication/login";
import { Header } from "./views/Header";
import Footer from "./views/Footer";
import Signup from "./pages/authentication/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <div className="w-screen h-screen bg-white flex flex-col overflow-y-auto">
          <Header />
          <div className="flex flex-col flex-1">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
