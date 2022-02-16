import { Link } from 'react-router-dom';

export default function Login(props) {
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