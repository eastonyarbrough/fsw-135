import { Link } from 'react-router-dom';

export default function SignUp(props) {
    return(
        <div>
            <input type="text" id="regUser" placeholder="Desired Username"></input>
            <input type="text" id="regPass" placeholder="Desired Password"></input>
            <input type="text" id="profImg" placeholder="Profile Picture URL"></input>
            <button onClick={() => props.userSignup()}>
                <Link to="/" style={{textDecoration: 'none', color: 'black'}}>Sign Up</Link>
            </button>
        </div>
    );
}