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
                        <h2>{e.title}</h2>
                        <h3>{e.description}</h3>
                    </div>
                );
            })
        );
    }
}