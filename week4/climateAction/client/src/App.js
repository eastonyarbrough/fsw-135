import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import './App.css';
import Home from './components/Home.js'
import SignUp from './components/SignUp.js';
import Login from './components/Login.js';

export const TokenContext = createContext();

function App() {
  const [token, setToken] = useState("");
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    if (token) {
      fetch('/api/issues', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(res => setIssues(res))
        .catch(err => console.log(err))
    }
  }, [token])

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
      .then(res => setToken(res.token))
      .catch(err => console.log(err))
  }

  const userSignup = () => {
    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: document.querySelector('#regUser').value,
        password: document.querySelector('#regPass').value
      })
    })
      .then(res => res.json())
      .then(res => setToken(res.token))
      .catch(err => console.log(err))
  }

  if (!token) {
    return (
      <BrowserRouter>
            <TokenContext.Provider value={token}>
              <nav>
                <Link to="/">Home</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Login</Link>
              </nav>
              <main>
                <Routes>
                  <Route exact path="/" element={<Home issues = {issues}/>}></Route>
                  <Route exact path="/signup" element={<SignUp userSignup = {userSignup}/>}></Route>
                  <Route exact path="/login" element={<Login userLogin = {userLogin}/>}></Route>
                </Routes>
              </main>
            </TokenContext.Provider>
      </BrowserRouter>
    );
  }
  else if (token) {
    return(
      <BrowserRouter>
            <TokenContext.Provider value={token}>
              <nav>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/" onClick={() => setToken("")}>Logout</Link>
              </nav>
              <main>
                <Routes>
                  <Route exact path="/" element={<Home issues = {issues}/>}></Route>
                  <Route exact path="/profile"></Route>
                </Routes>
              </main>
            </TokenContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App;