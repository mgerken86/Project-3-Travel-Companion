import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import AuthPage from '../AuthPage/AuthPage'
import IndexPage from '../IndexPage/IndexPage'
import HotelsIndexPage from '../HotelsIndexPage/HotelsIndexPage'
import NavBar from '../../components/NavBar/NavBar';
import { getUser } from '../../utilities/users-service'



export default function App() {
  const [user, setUser] = useState(getUser())
  return (
    <main className="App">
      { user ?
      <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        {/* Route components in here */}
        <Route path="/search" element={<IndexPage />} />
        <Route path="/hotels" element={<HotelsIndexPage />} />
      </Routes>
      </>
      :
      <AuthPage setUser={setUser}/>
    }
    </main>
  );
}