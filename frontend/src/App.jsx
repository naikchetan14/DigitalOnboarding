import "./App.css";
import Header from "./compents/Header/Header";
import Guest from "./pages/Guest/Guest";
import Login from "./pages/Home/Auth/Login";
import Register from "./pages/Home/Auth/Register";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hotel from "./pages/Hotel/hotel";
import Thanks from "./pages/Thanks/Thanks";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import GuestList from "./pages/Guest/GuestList";
import Sorry from "./pages/Sorry/Sorry";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Header />}>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/hotel/:id"
              element={
                <ProtectedRoute allowedRoles={"Guest"}>
                  <Guest></Guest>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/mainadmin/add/newhotel"
              element={
                <ProtectedRoute allowedRoles={["mainAdmin"]}>
                  <Hotel />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/guest/thanks"
              element={
                <ProtectedRoute allowedRoles={"Guest"}>
                  <Thanks />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/guest/allguestlist"
              element={
                <ProtectedRoute allowedRoles={["mainAdmin", "guestAdmin"]}>
                  <GuestList />
                </ProtectedRoute>
              }
            ></Route>
             <Route path="*" element={<Sorry />} /> // page-not-found route
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
