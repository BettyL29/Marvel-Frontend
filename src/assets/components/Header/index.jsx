import "./header.css";
import logoMarvel from "../../../img/logo-marvel.png";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = ({ setDisplay, token, setToken, setToggle }) => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="header-container">
        <div className="header-connect">
          {token ? (
            <button
              onClick={() => {
                Cookies.remove("tokenMarvel");
                setToken("");
                localStorage.clear();
                navigate("/");
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <div>
              <button
                onClick={() => {
                  setDisplay(true);
                  setToggle(2);
                }}
              >
                Se connecter
              </button>
              <button
                onClick={() => {
                  setDisplay(true);
                  setToggle(1);
                }}
              >
                S'inscrire
              </button>
            </div>
          )}
        </div>
        <div className="header-logo">
          <Link to="/">
            <img src={logoMarvel} alt="marvel written in red" />
          </Link>
        </div>
        <nav>
          <Link to="/">
            <button>Characters</button>
          </Link>

          <Link to="/comics">
            <button>Comics</button>
          </Link>

          {token && (
            <Link to="/favorite">
              <button>Favorites</button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
