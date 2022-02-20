import { useContext } from 'react';
import { TokenContext } from '../App.js';
import { Link } from 'react-router-dom';

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
                        <div>
                            <img src={e.userProfImg} alt={`${e.userName}'s post`}></img>
                            <h3>{e.userName}</h3>
                        </div>
                        <div>
                            <h2>{e.title}</h2>
                            <h3>{e.description}</h3>
                        </div>
                        <div>
                            <button onClick={() => {
                                props.getComments(e._id, e.userID)
                                props.getOriginalPoster(e.userID)
                                props.setOriginalPost({title: e.title, description: e.description})
                            }}>
                                <Link to="/comments" style={{textDecoration: 'none', color: 'black'}}>Comments</Link>
                            </button>
                        </div>
                    </div>
                );
            })
        );
    }
}