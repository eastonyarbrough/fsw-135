import { useContext } from 'react';
import { TokenContext } from '../App.js';

export default function Comments(props) {
    const token = useContext(TokenContext);
    

    if (props.commentThread.errMsg) {
        return(
            <h4>This post has no comments yet.</h4>
        );
    }
    else if (!props.commentThread.errMsg) {
        return(
            props.commentThread.map(e => {
                let user = []
                let count = -1;
                props.commentOwnerIDs.map(element => {
                    fetch(`auth/search/user?_id=${element}`, {
                        method: 'GET',
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(res => res.json())
                        .then(res => {
                            user.push(res);
                            count++
                            console.log(user);
                            console.log(count);
                        })
                        .catch(err => console.log(err))
                })
                
                return(
                    <div>
                        <h3>{user[count].userName}</h3>
                        <img src={user.profImg} alt={`${user.userName} profile pic`}></img>
                        <h4>{e.comment}</h4>
                    </div>
                );
            })
        )
    }
}