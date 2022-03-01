import Comments from './Comments.js';

export default function OriginalPost(props) {
    return(
        <div>
            <div>
                <div>
                    <img src={props.originalPoster.profImg} alt={`${props.originalPoster.userName}'s post`}></img>
                    <h2>{props.originalPoster.userName}</h2>
                </div>
                <div>
                    <h1>{props.originalPost.title}</h1>
                    <h2>{props.originalPost.description}</h2>
                </div>
            </div>
            <Comments commentThread = {props.commentThread}/>
        </div>
        
    );
}