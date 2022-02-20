import { useEffect } from 'react';
import ListUserPosts from './ListUserPosts.js';

export default function Profile(props) {
    useEffect(() => {
        props.userPosts(props.currentUser._id)
    }, [])
    
    return(
        <div>
            <h2>Username: {props.currentUser.userName}</h2>
            <img src={props.currentUser.profImg} alt={`${props.currentUser.userName}'s profile pic`}></img>
            <ListUserPosts 
                userIssues = {props.userIssues}
                getComments = {props.getComments}
                getOriginalPoster = {props.getOriginalPoster}
                setOriginalPost = {props.setOriginalPost}
            />
        </div>
    );
}