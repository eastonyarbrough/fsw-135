import { useContext } from 'react';
import { TokenContext } from '../App.js';
import { Link } from 'react-router-dom';

export default function Login(props) {
    const token = useContext(TokenContext);

    if (!token) {
        return(
            <div id="loginCont">
                <div className="styleCont">
                    <div className="centTxt">
                        <h2>Please login to continue.</h2>
                    </div>
                    <div id="loginAssetCont">
                        <input type="text" id="logUser" className="loginAsset" placeholder="Username"></input>
                        <input type="text" id="logPass" className="loginAsset" placeholder="Password"></input>
                        <button onClick={() => props.userLogin()} className="loginAsset">
                            <Link to="/" style={{textDecoration: 'none', color: 'black'}}>Login</Link>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    else if (token) {
        return(
            <div id="thanksMsg">
                <div className="styleCont">
                    <div className="introCont">
                        <h2>Thank you for logging in. Please navigate to home or profile to continue.</h2>
                    </div>
                </div>
            </div>
        )
    }
}