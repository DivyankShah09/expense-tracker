import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/authentication/login/login";
import { Header } from "./views/Header";
import Footer from "./views/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/authentication/signup/signUp";
import AddIncome from "./pages/income/addIncome";
import AddExpense from "./pages/expense/addExpense";
import Dashboard from "./pages/dashboard/dashboard";
import SideBar from "./components/sidebar/SideBar";

function App() {
  return (
    <>
      <div className="overflow-x-hidden">
        <Router>
          <ConditionalHeader />
          <div className="w-screen h-screen bg-white flex flex-col overflow-y-auto">
            <ToastContainer />
            {/* <div className="flex flex-col flex-1">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/add-income" element={<AddIncome />} />
                <Route path="/add-expense" element={<AddExpense />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div> */}
            <div className="relative flex flex-row h-full">
              <ConditionalSideBar />

              <div className="w-full">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/add-income" element={<AddIncome />} />
                  <Route path="/add-expense" element={<AddExpense />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </div>
            </div>
          </div>
          <Footer />
        </Router>
      </div>
    </>
  );
}

const ConditionalHeader = () => {
  const location = useLocation();

  // Specify the pages where you want to show the header
  const includedRoutes = ["/login", "/signup"];

  if (!includedRoutes.includes(location.pathname)) {
    return null; // Don't render header on these routes
  }

  return <Header />; // Render header on all other routes
};

const ConditionalSideBar = () => {
  const location = useLocation();

  // Specify the pages where you want to show the header
  const excludedRoutes = ["/login", "/signup"];

  if (excludedRoutes.includes(location.pathname)) {
    return null; // Don't render header on these routes
  }

  return (
    <div className="w-[11%] h-full">
      <SideBar />
    </div>
  ); // Render header on all other routes
};

export default App;
