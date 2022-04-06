import {Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "./Pages/Main";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import Favorites from "./Pages/Favorites";


/**
 * App component managing routes
 * @params -
 * @returns -
 */
const App = () => {

  const user = localStorage.getItem("token");

  return (
	<BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="product" element={<Product />} />
      <Route path="favorites" element={<Favorites />} />
    </Routes>
	</BrowserRouter>
  );
}

export default App;
