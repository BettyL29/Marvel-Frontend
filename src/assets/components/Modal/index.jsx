import "./modal.css";
import Signup from "../Signup";
import Login from "../Login";

const Modal = ({
  setDisplay,
  setUsername,
  username,
  setToken,
  toggle,
  setUserId,
}) => {
  return (
    <div className="modal-container">
      {toggle === 1 && (
        <Signup
          setDisplay={setDisplay}
          setUsername={setUsername}
          username={username}
          setToken={setToken}
          setUserId={setUserId}
        />
      )}
      {toggle === 2 && (
        <Login
          setDisplay={setDisplay}
          setToken={setToken}
          setUserId={setUserId}
        />
      )}
    </div>
  );
};

export default Modal;
