import { Link } from 'react-router-dom';
import comBtn from '../images/comBtn.png';
import likeBtn from '../images/likeBtn.png';
import dislikeBtn from '../images/dislikeBtn.png';

export default function ListUserPosts(props) {
    if (props.userIssues.errMsg) {
        return(
            <div>
                <div className="styleCont">
                    <div className="introCont">
                        <h2>You have not made a post yet.</h2>
                    </div>
                </div>
            </div>
        );
    }
    else if (!props.userIssues.errMsg) {
        return(
            props.userIssues.map(e => {
                return(
                <div className="styleCont">
                    <div className="indPostCont">
                        <div className="usersPostInfo">
                            <h2 className="userPostTitle">{e.title}</h2>
                            <h3>{e.description}</h3> 
                        </div>
                        <div className="postFeatures">
                            <Link  onClick={() => {
                                props.getComments(e._id, e.userID)
                                props.getOriginalPoster(e.userID)
                                props.setOriginalPost({title: e.title, description: e.description})
                            }} className="featAsset" to="/comments" style={{textDecoration: 'none', color: 'black'}}>
                                <img src={comBtn} alt='comment button'></img>    
                            </Link>
                            <img src={likeBtn} alt='likes' className="featAsset"></img>
                            <h4 className="featAsset">{e.upVotes}</h4>
                            <img src={dislikeBtn} alt="dislikes" className="featAsset"></img>
                            <h4 className="featAsset">{e.downVotes}</h4>
                        </div>
                    </div>
                </div>
                );
            })
        );
    }
}