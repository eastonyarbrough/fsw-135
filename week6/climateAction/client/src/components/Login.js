import { useContext } from 'react';
import { TokenContext } from '../App.js';
import { Link } from 'react-router-dom';

export default function Login(props) {
    const token = useContext(TokenContext);

    if (!token) {
        return(
            <div>
                <input type="text" id="logUser" placeholder="Username"></input>
                <input type="text" id="logPass" placeholder="Password"></input>
                <button onClick={() => props.userLogin()}>
                    <Link to="/" style={{textDecoration: 'none', color: 'black'}}>Login</Link>
                </button>
            </div>
        );
    }
    else if (token) {
        return(
            <div>
                <h1>Thank you for logging in. Please navigate to home or profile to continue.</h1>
            </div>
        )
    }
}