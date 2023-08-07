import { Link, Routes, Route, Navigate } from "react-router-dom";
import Navber from "./components/layout/Navbar/Navber";
import ProductsPage from "./components/pages/Product/ProductsPage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import { createContext, useState } from "react";
import { UserData } from "./types/UserData.type";

export const DataUser = createContext<any>(null);

export default function App() {
  const [check, setCheck] = useState(false);
  const [data, setData] = useState<UserData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const NotFound = () => {
    return (
      <div>
        <h1>404 - Not Found!</h1>
        <Link to="/">Go Home</Link>
      </div>
    );
  };

  return (
    <>
      <DataUser.Provider value={{ data, setData, check, setCheck }}>
        <Navber />
        <div className="container mx-auto">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/product" element={<ProductsPage />} />
            <Route
              path="/"
              element={
                check ? <Navigate to="/profile" /> : <Navigate to="/login" />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </DataUser.Provider>
    </>
  );
}
