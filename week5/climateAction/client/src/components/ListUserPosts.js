import { Link } from 'react-router-dom';

export default function ListUserPosts(props) {
    if (props.userIssues.errMsg) {
        return(
            <div>
                <h2>You have not made a post yet.</h2>
            </div>
        );
    }
    else if (!props.userIssues.errMsg) {
        return(
            props.userIssues.map(e => {
                return(
                    <div>
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
                        <div>
                            <h4>{`Likes: ${e.upVotes}`}</h4>
                            <h4>{`Dislikes: ${e.downVotes}`}</h4>
                        </div>
                    </div>
                );
            })
        );
    }
}