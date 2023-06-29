import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/app.css";
import Nav from "./components/Nav";
import Homepage from "./pages/Homepage";
import StockIndex from "./pages/StockIndex";
import IndStock from "./pages/IndStock";
import Forum from "./pages/Forum";
import Member from "./pages/Member";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Rookie from "./pages/Rookie";
import Footer from "./components/Footer";
function App() {
  return (

    <Router>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Homepage />} exact/>
        <Route path="/stock-index" element={<StockIndex />} />
        <Route path="/indStock" element={<IndStock />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/memeber" element={<Member />} />
          <Route path="/cart">
            <Route index element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
        <Route path="/rookie" element={<Rookie />} />
      </Routes>
      
      <Footer></Footer>
    </Router>
  );
}

export default App;
