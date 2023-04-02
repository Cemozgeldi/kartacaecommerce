import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import Basket from "./pages/Basket";
import axios from "axios";

function App() {
  axios.post("http://localhost:4000/auth/login", {
    email: "cemozgeldi@gmail.com",
    password: "123456",
  });
  return (
    <Router>
      <div>
        <Navbar />
        <div id="content">
          <Routes>
            <Route path="/" exact element={<Products />} />
            <Route path="/product/:product_id" element={<ProductDetail />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
