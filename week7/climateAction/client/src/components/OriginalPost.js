import Comments from './Comments.js';

export default function OriginalPost(props) {
    return(
        <div>
            <div id="ogPostCont">
                <div className="thisUserInfo">
                    <h2>{props.originalPoster.userName}</h2>
                    <img src={props.originalPoster.profImg} alt={`${props.originalPoster.userName}'s post`} className="userProfImg"></img>
                </div>
                <div className="styleCont">
                    <div className="thisUserPost">
                        <h1>{props.originalPost.title}</h1>
                        <h2>{props.originalPost.description}</h2>
                    </div>
                </div>
            </div>
            <Comments commentThread = {props.commentThread}/>
        </div>
        
    );
}