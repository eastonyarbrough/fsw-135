import { Link } from 'react-router-dom';
import comBtn from '../images/comBtn.png';
import likeBtn from '../images/likeBtn.png';
import dislikeBtn from '../images/dislikeBtn.png';

export default function PostFeed(props) {
    return(
        props.issues.map(e => {
            return(
                <div className="postCont">
                    <div className="styleCont">
                        <div className="userCont">
                            <div className="thisUserInfo">
                                <h3>{e.userName}</h3>
                                <img src={e.userProfImg} alt={`${e.userName}'s post`} className="userImg"></img>
                            </div>
                            <div className="thisUserPost">
                                <h2 className="userPostTitle">{e.title}</h2>
                                <h3>{e.description}</h3>
                                <div className='postFeatures'>
                                    <Link onClick={() => {
                                        props.getComments(e._id, e.userID)
                                        props.getOriginalPoster(e.userID)
                                        props.setOriginalPost({title: e.title, description: e.description})
                                    }} className="featAsset" to="/comments">
                                        <img src={comBtn} alt="comment button"></img>    
                                    </Link>
                                    <img onClick={() => props.upvote(e._id)} src={likeBtn} alt='likes' className="featAsset"></img>
                                    <h4 className="featAsset">{e.upVotes}</h4>
                                    <img onClick={() => props.downvote(e._id)} src={dislikeBtn} alt='dislikes' className="featAsset"></img>
                                    <h4 className="featAsset">{e.downVotes}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })
    );
}