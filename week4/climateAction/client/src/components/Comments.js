export default function Comments(props) {
    if (props.commentThread.errMsg) {
        return(
            <h4>This post has no comments yet.</h4>
        );
    }
    else if (!props.commentThread.errMsg) {
        return(
            props.commentThread.map(e => {
                return(
                    <div>
                        <img src={e.userProfImg} alt={`${e.userName}'s profile pic`}></img>
                        <h3>{e.userName}</h3>
                        <h3>{e.comment}</h3>
                    </div>
                );
            })
        )
    }
}