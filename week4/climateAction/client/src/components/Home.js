import { useContext } from 'react';
import { TokenContext } from '../App.js'

export default function Home(props) {
    const token = useContext(TokenContext);
    if (!token) {
        return(
            <div>
                <h1>Welcome to Climate Action Hub!</h1>
                <h2>Please login or sign up to continue</h2>
            </div>
        );
    }
    else if (token) {
        return(
            props.issues.map(e => {
                return(
                    <div>
                        <h2>{e.title}</h2>
                    </div>
                );
            })
        );
    }
}