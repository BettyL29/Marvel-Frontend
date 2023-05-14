import "./modal.css";
import Signup from "../Signup";
import Login from "../Login";

const Modal = ({ setDisplay, setUsername, username, setToken, toggle }) => {
  return (
    <div className="modal-container">
      {toggle === 1 && (
        <Signup
          setDisplay={setDisplay}
          setUsername={setUsername}
          usrename={username}
          setToken={setToken}
        />
      )}
      {toggle === 2 && <Login setDisplay={setDisplay} setToken={setToken} />}
    </div>
  );
};

export default Modal;
