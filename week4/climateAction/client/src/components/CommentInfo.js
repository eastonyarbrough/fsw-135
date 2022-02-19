export default function CommentInfo(props) {
    return(
        props.commentUserInfo.map(e => {
            return(
                <div>
                    <h3>{e.userName}</h3>
                    <img src={e.profImg} alt={`${e.userName} profile pic`}></img>
                </div>
            );
        })
    )
}