import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = ({ setDisplay, setToken, setUserId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleClickSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setDisplay(false);
    navigate("/");

    try {
      const response = await axios.post(
        "https://site--marvel-backend--cqkrrjqcs6yr.code.run/users/login",
        // "http://localhost:3000/users/login",

        {
          email,
          password,
        }
      );
      // console.log(response.data);
      if (response.data.token) {
        Cookies.set("tokenMarvel", response.data.token, { expires: 7 });
        Cookies.set("userIdCookie", response.data._id, { expires: 7 });
        setToken(response.data.token);
        setUserId(response.data._id);
      }

      //
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="modal-content"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <button
        className="signup-close"
        onClick={() => {
          setDisplay(false);
        }}
      >
        x
      </button>
      <p className="modal-p">Se connecter</p>
      <form id="login-form" onSubmit={handleClickSubmit}>
        <div className="input-form">
          <label>
            <input
              className="email"
              type="email"
              placeholder="Email"
              name="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={email}
            />
          </label>
          <label>
            <input
              className="password"
              type="password"
              placeholder="Mot de passe"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
            />
          </label>
        </div>

        <button className="submit" type="submit">
          Se connecter
        </button>
      </form>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
};

export default Login;
