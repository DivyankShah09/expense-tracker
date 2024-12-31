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
import ListAllExpenses from "./pages/expense/listAllExpenses";
import ListAllIncomes from "./pages/income/listAllIncomes";
import ForgotPassword from "./pages/authentication/forgotpassword/forgotPassword";
import Home from "./pages/home/Home";
import ListAllRecurringExpense from "./pages/recurringexpense/listAllRecurringExpense";
import UpdateRecurringExpense from "./pages/recurringexpense/updateRecurringExpense";

function App() {
  return (
    <>
      <ToastContainer />
      <div className="overflow-x-hidden  overflow-y-hidden">
        <Router>
          <ConditionalHeader />
          <div className="w-screen bg-white flex flex-col">
            <div className="relative flex flex-row">
              <ConditionalSideBar />
              <div className="w-full">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/add-income" element={<AddIncome />} />
                  <Route path="/edit-income/:id" element={<AddIncome />} />
                  <Route path="/add-expense" element={<AddExpense />} />
                  <Route path="/edit-expense/:id" element={<AddExpense />} />
                  <Route
                    path="/edit-recurring-expense/:id"
                    element={<UpdateRecurringExpense />}
                  />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route
                    path="/list-all-expenses"
                    element={<ListAllExpenses />}
                  />
                  <Route
                    path="/list-all-recurring-expenses"
                    element={<ListAllRecurringExpense />}
                  />
                  <Route
                    path="/list-all-incomes"
                    element={<ListAllIncomes />}
                  />
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

  const includedRoutes = ["/login", "/signup", "/forgot-password"];

  if (!includedRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <Header
      className="bg-white border-b-primary shadow-primary shadow-sm z-20 border-2"
      logoColor="text-logo"
    />
  );
};

const ConditionalSideBar = () => {
  const location = useLocation();

  const excludedRoutes = ["/login", "/signup", "/forgot-password", "/"];

  if (excludedRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="w-fit">
      <SideBar />
    </div>
  );
};

export default App;
