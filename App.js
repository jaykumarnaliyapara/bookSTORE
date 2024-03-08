import Cart from './screen/cart.js'
import Home from './screen/home.js'
import Login from './screen/login.js';
import './App.css';
import Navbar from './components/Navbar.js';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/Footer.js'
import Profile from './screen/profile.js'
import SignUP from "./screen/signup.js";
import { CartProvider } from './components/ContextReducer.js'
import MyOrder from "./screen/myorders.js";
import Payment from './screen/payment.js';
import Paymentsuccess from './screen/PaymentSuccess.jsx'
import About from './screen/about.js'
function App() {


  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/home.js" element={<Home />} />
            <Route exact path="/" element={<Navbar />} />
            <Route exact path="/login.js" element={<Login />} />
            <Route exact path="/cart.js" element={<Cart />} />
            <Route exact path="/myorders.js" element={<MyOrder />} />
            <Route exact path="/signup.js" element={<SignUP />} />
            <Route exact path="/profile.js" element={<Profile />} />
            <Route exact path="/payment.js" element={<Payment />} />
            <Route exact path="/paymentsuccess" element={<Paymentsuccess />} />
            <Route exact path="/about.js" element={<About />} />

          </Routes>
        </div>
        <Footer />
      </Router>
    </CartProvider>
  );
}
export default App;
