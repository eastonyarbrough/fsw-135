import CommentInfo from './CommentInfo.js'

export default function Comments(props) {
    console.log(props.commentUserInfo);

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
                        <h3>{e.comment}</h3>
                        <CommentInfo commentUserInfo = {props.commentUserInfo}/>
                    </div>
                );
            })
        )
    }
}