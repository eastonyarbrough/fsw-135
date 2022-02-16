import { useContext } from 'react';
import { LoggedContext } from '../App.js';

export default function Home() {
    const loggedIn = useContext(LoggedContext);
    
    if (loggedIn === false) {
        return(
            <div>
                <h1>Welcome to Climate Action Hub!</h1>
                <h2>Please login or sign up to continue</h2>
            </div>
        );
    }
    else if (loggedIn === true) {
        return(
            <div>
                <h1>Thank you for logging in!</h1>
            </div>
        );
    }
}
