import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import './App.css';
import Home from './components/Home.js'
import SignUp from './components/SignUp.js';
import Login from './components/Login.js';

export const LoggedContext = createContext();
export const SetLoggedContext = createContext();
export const TokenContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const checkToken = () => {
    if (token === undefined || token === "") {
      setLoggedIn(false);
    }
    else if (token !== undefined || token !== "") {
      setLoggedIn(true);
    }
  }

  const userLogin = () => {
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: document.querySelector('#logUser').value,
        password: document.querySelector('#logPass').value
      })
    })
      .then(res => res.json())
      .then(res => {
        setToken(res.token);
        checkToken();
      })
      .catch(err => console.log(err))
  }

  return (
    <BrowserRouter>
      <LoggedContext.Provider value={loggedIn}>
        <SetLoggedContext.Provider value={setLoggedIn}>
          <TokenContext.Provider value={token}>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Login</Link>
            </nav>
            <main>
              <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/signup" element={<SignUp/>}></Route>
                <Route exact path="/login" element={<Login userLogin = {userLogin}/>}></Route>
              </Routes>
            </main>
          </TokenContext.Provider>
        </SetLoggedContext.Provider>
      </LoggedContext.Provider>
    </BrowserRouter>
  );
}

export default App;