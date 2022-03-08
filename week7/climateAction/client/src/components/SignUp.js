import { Link } from 'react-router-dom';

export default function SignUp(props) {
    return(
        <div id="signUpCont">
            <div className="styleCont">
                <div className="centTxt">
                    <h2>Register your account.</h2>
                </div>
                <div id="signUpAssetCont">
                    <input type="text" id="regUser" className="signUpAsset" placeholder="Desired Username"></input>
                    <input type="text" id="regPass" className="signUpAsset" placeholder="Desired Password"></input>
                    <input type="text" id="profImg" className="signUpAsset" placeholder="Profile Picture URL"></input>
                    <button onClick={() => props.userSignup()}>
                        <Link to="/" style={{textDecoration: 'none', color: 'black'}}>Sign Up</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}