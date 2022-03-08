import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import './App.css';
import Home from './components/Home.js';
import SignUp from './components/SignUp.js';
import Login from './components/Login.js';
import Profile from './components/Profile.js';
import OriginalPost from './components/OriginalPost.js';

export const TokenContext = createContext();

function App() {
  const initToken = localStorage.getItem('token') || "";
  const initUser = JSON.parse(localStorage.getItem('user')) || {};

  const [token, setToken] = useState(initToken);

  const [issues, setIssues] = useState([]);

  const [currentUser, setCurrentUser] = useState(initUser);
  const [userIssues, setUserIssues] = useState([]);
  
  const [originalPost, setOriginalPost] = useState({});
  const [originalPoster, setOriginalPoster] = useState({});
  const [commentThread, setCommentThread] = useState([]);

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
      .then(res => {
        setToken(res.token);
        setCurrentUser(res.user);
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      })
      .catch(err => console.log(err))
  }

  const userSignup = () => {
    let userBody = {}

    if (document.querySelector('#profImg').value !== "") {
      userBody = {
        userName: document.querySelector('#regUser').value,
        password: document.querySelector('#regPass').value,
        profImg: document.querySelector('#profImg').value
      }
    }
    else if (document.querySelector('#profImg').value === "") {
      userBody = {
        userName: document.querySelector('#regUser').value,
        password: document.querySelector('#regPass').value
      }
    }

    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userBody)
    })
      .then(res => res.json())
      .then(res => {
        setToken(res.token)
        setCurrentUser(res.user);
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      })
      .catch(err => console.log(err))
  }

  const userPosts = (id) => {
    fetch(`/api/issues/search/user?userID=${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(res => setUserIssues(res))
      .catch(err => console.log(err))
  }

  const createPost = () => {
    fetch('/api/issues', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: document.querySelector('#postTitle').value,
        description: document.querySelector('#postDesc').value
      })
    })
      .then(rerender())
      .catch(err => console.log(err))
  }

  const getComments = (id) => {
    fetch(`api/comments/search/post?postID=${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(res => setCommentThread(res))
      .catch(err => console.log(err))
  }

  const getOriginalPoster = (id) => {
    fetch(`auth/search/user?_id=${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(res => setOriginalPoster(res))
      .catch(err => console.log(err))
  }

  const rerender = () => {
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

  const upvote = (id) => {
    fetch(`api/issues/upvote/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(rerender())
      .catch(err => console.log(err))
  }

  const downvote = (id) => {
    fetch(`api/issues/downvote/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(rerender())
      .catch(err => console.log(err))
  }

  if (!token) {
    return (
      <BrowserRouter>
            <TokenContext.Provider value={token}>
              <nav>
                <Link to="/" className="navAnchor">Home</Link>
                <Link to="/signup" className="navAnchor">Sign Up</Link>
                <Link to="/login" className="navAnchor">Login</Link>
              </nav>
              <main>
                <Routes>
                  <Route exact path="/" element={<Home/>}></Route>
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
                <Link to="/" className="navAnchor">Home</Link>
                <Link to="/profile" className="navAnchor">Profile</Link>
                <Link to="/" className="navAnchor" onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  setToken("");
                  setCurrentUser({});
                }}>Logout</Link>
              </nav>
              <main>
                <Routes>
                  <Route exact path="/" element={<Home
                    createPost = {createPost}
                    issues = {issues}
                    getComments = {getComments}
                    getOriginalPoster = {getOriginalPoster}
                    originalPoster = {originalPoster}
                    setOriginalPost = {setOriginalPost}
                    upvote = {upvote}
                    downvote = {downvote}
                  />}></Route>
                  <Route exact path="/profile" element={<Profile
                    currentUser = {currentUser}
                    userPosts = {userPosts}
                    userIssues = {userIssues}
                    getComments = {getComments}
                    getOriginalPoster = {getOriginalPoster}
                    setOriginalPost = {setOriginalPost}
                  />}></Route>
                  <Route exact path="/comments" element={<OriginalPost
                    commentThread = {commentThread}
                    originalPoster = {originalPoster}
                    originalPost = {originalPost}
                  />}></Route>
                  <Route exact path="/login" element={<Login/>}></Route>
                </Routes>
              </main>
            </TokenContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App;