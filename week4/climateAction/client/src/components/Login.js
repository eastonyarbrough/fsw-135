export default function Login(props) {
    return(
        <div>
            <input type="text" id="logUser" placeholder="Username"></input>
            <input type="text" id="logPass" placeholder="Password"></input>
            <button onClick={() => {props.userLogin()}}>Login</button>
        </div>
    );
}
