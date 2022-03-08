import { useEffect } from 'react';
import ListUserPosts from './ListUserPosts.js';

export default function Profile(props) {
    useEffect(() => {
        props.userPosts(props.currentUser._id)
    }, [])
    
    return(
        <div id="curUserProf">
            <h2>{props.currentUser.userName}</h2>
            <img src={props.currentUser.profImg} alt={`${props.currentUser.userName}'s profile pic`} className="userProfImg"></img>
            <div id="usersPostsCont">
                <ListUserPosts 
                    userIssues = {props.userIssues}
                    getComments = {props.getComments}
                    getOriginalPoster = {props.getOriginalPoster}
                    setOriginalPost = {props.setOriginalPost}
                />
            </div>
            
        </div>
    );
}