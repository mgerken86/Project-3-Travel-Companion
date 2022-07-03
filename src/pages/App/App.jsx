import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import AuthPage from "../AuthPage/AuthPage";
import IndexPage from "../IndexPage/IndexPage";
import HotelListPage from "../HotelListPage/HotelListPage";
import HotelShowPage from "../HotelShowPage/HotelShowPage";
import AccountPage from "../AccountPage/AccountPage";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../utilities/users-service";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [search, setSearch] = useState({});
  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} setSearch={setSearch} />
          <Routes>
            {/* Route components in here */}
            <Route
              path="/search"
              element={<IndexPage setSearch={setSearch} />}
            />
            <Route path="/hotels" element={<HotelListPage />} />
            <Route
              path="/users/myAccount"
              element={<AccountPage user={user} setSearch={setSearch} />}
            />
            <Route
              path="/hotels/:id"
              element={<HotelShowPage setSearch={setSearch} />}
            />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
