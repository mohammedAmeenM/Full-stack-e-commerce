import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Dog from "./components/Dog";
import Cat from "./components/Cat";
import Collection from "./components/Collection";
import Cart from "./components/Cart";
import Signup from "./components/Signup";
import { createContext, useState } from "react";
import { Product } from "./components/ProductData";
import ViewProduct from "./components/ViewProduct";
import AdminLogin from "./admin/AdminLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminMainPage from "./admin/AdminMainPage";
import AdminUsers from "./admin/AdminUsers";
import AdminProducts from "./admin/AdminProducts";
import AdminAddProducts from "./admin/AdminAddProducts";
import EditProduct from "./admin/EditProduct";
import ViewOrder from "./admin/ViewOrder";
import axios from "axios";



 export const Axios=axios.create({
  baseURL:process.env.REACT_APP_BASE_URL,
  headers:{
    "Content-Type":"application/json",
    Authorization:localStorage.getItem("user_Token")
  }
 })
 
 console.log(process.env.REACT_APP_BASE_URL);




export const UserLogin = createContext();

function App() {
  const [user, setUser] = useState([]);
  const [login, setLogin] = useState(false);
  const [product, setProduct] = useState(Product);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");    //
  const [buy, setBuy] = useState([]);

  return (
    <div className="App">
      <UserLogin.Provider
        value={{
          user,
          setUser,
          login,
          setLogin,
          product,
          setProduct,
          cart,
          setCart,
          search,
          setSearch,
          buy,
          setBuy,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/dog" element={<Dog />} />
          <Route path="/cat" element={<Cat />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/viewproduct/:id" element={<ViewProduct />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminpage" element={<AdminMainPage />} />
          <Route path="/adminuser" element={<AdminUsers />} />
          <Route path="/adminproduct" element={<AdminProducts />} />
          <Route path="/addproduct" element={<AdminAddProducts />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
          <Route path="/vieworder" element={<ViewOrder />} />
        </Routes>
      </UserLogin.Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
