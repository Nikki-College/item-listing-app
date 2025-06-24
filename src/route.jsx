import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddItem from "./components/AddItem";
import ViewItems from "./components/Viewitems";

function AppRoutes() {
  return (
    <Router>
      <nav className="p-4 bg-gray-200 flex gap-4">
        <Link to="/" className="text-blue-600 font-semibold">
          Add Item
        </Link>
        <Link to="/view" className="text-blue-600 font-semibold">
          View Items
        </Link>
      </nav>

      <div className="p-4">
        <Routes>
          <Route path="/" element={<AddItem />} />
          <Route path="/view" element={<ViewItems />} />
        </Routes>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}
export default AppRoutes;
