import { Link } from 'react-router-dom';

export default function SignUp(props) {
    return(
        <div>
            <input type="text" id="regUser" placeholder="Desired Username"></input>
            <input type="text" id="regPass" placeholder="Desired Password"></input>
            <button onClick={() => props.userSignup()}>
                <Link to="/" style={{textDecoration: 'none', color: 'black'}}>Sign Up</Link>
            </button>
        </div>
    );
}