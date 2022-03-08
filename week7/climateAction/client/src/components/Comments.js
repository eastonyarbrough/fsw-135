export default function Comments(props) {
    if (props.commentThread.errMsg) {
        return(
            <div id="noComments">
                <h2>This post has no comments yet.</h2>
            </div>
        );
    }
    else if (!props.commentThread.errMsg) {
        return(
            props.commentThread.map(e => {
                return(
                    <div className="centerDiv">
                        <div className="styleCont">
                            <div className="userCont">
                                <div className="thisUserInfo">
                                    <h3>{e.userName}</h3>
                                    <img src={e.userProfImg} alt={`${e.userName}'s profile pic`} className="userImg"></img>
                                </div>
                                <div className="thisUserPost">
                                    <h3>{e.comment}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })
        )
    }
}