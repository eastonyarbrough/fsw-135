import { useContext } from 'react';
import { TokenContext } from '../App.js';
import PostFeed from './PostFeed.js'

export default function Home(props) {
    const token = useContext(TokenContext);

    const clearInputs = () => {
        document.querySelector('#postTitle').value = "";
        document.querySelector('#postDesc').value = "";
    }

    if (!token) {
        return(
            <div id="flexIntro">
                <div className="styleCont">
                    <div className="introCont">
                        <h1>Welcome to Climate Action Hub!</h1>
                        <h2>Please login or sign up to continue</h2>
                    </div>
                </div>
            </div>
        );
    }
    else if (token) {
        return(
            <div>
                <div id="flexPostCont">
                    <h1>Tell us your climate concerns!</h1>
                    <input type="text" id="postTitle" placeholder="Post title"></input>
                    <input type="text" id="postDesc" placeholder="Post body"></input>
                    <button id="postSubmit" onClick={() => {
                        props.createPost();
                        clearInputs();    
                    }}>Submit</button>
                </div>
                <div>
                    <PostFeed
                        issues = {props.issues}
                        getComments = {props.getComments}
                        getOriginalPoster = {props.getOriginalPoster}
                        originalPoster = {props.originalPoster}
                        setOriginalPost = {props.setOriginalPost}
                        upvote = {props.upvote}
                        downvote = {props.downvote}
                    />
                </div>
            </div>
        )
    }
}