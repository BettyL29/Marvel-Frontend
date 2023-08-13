import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faChevronUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

//import components
import Header from "./assets/components/Header";
import Modal from "./assets/components/Modal";

//import page
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Character from "./pages/Character";
import Favorite from "./pages/Favorite";

library.add(faHeart, faChevronUp, faXmark);

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [totalOfPage, setTotalOfPage] = useState([]);
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [toggle, setToggle] = useState();
  const [username, setUsername] = useState("");
  const [favoriteTabCharacters, setFavoriteTabCharacters] = useState([]);
  const [favoriteTabComics, setFavoriteTabComics] = useState([]);

  return (
    <Router>
      {display && (
        <Modal
          setDisplay={setDisplay}
          setUsername={setUsername}
          username={username}
          setToken={setToken}
          token={token}
          toggle={toggle}
          setUserId={setUserId}
          userId={userId}
        />
      )}
      <Header
        display={display}
        setDisplay={setDisplay}
        token={token}
        setToken={setToken}
        setToggle={setToggle}
        setUserId={setUserId}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Characters
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalOfPage={totalOfPage}
              setTotalOfPage={setTotalOfPage}
              search={search}
              setSearch={setSearch}
              favoriteTabCharacters={favoriteTabCharacters}
              setFavoriteTabCharacters={setFavoriteTabCharacters}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalOfPage={totalOfPage}
              setTotalOfPage={setTotalOfPage}
              search={search}
              setSearch={setSearch}
              favoriteTabComics={favoriteTabComics}
              setFavoriteTabComics={setFavoriteTabComics}
            />
          }
        />
        <Route path="/:characterId" element={<Character />} />
        <Route
          path="/favorite"
          element={
            <Favorite
              favoriteTabCharacters={favoriteTabCharacters}
              setFavoriteTabCharacters={setFavoriteTabCharacters}
              setFavoriteTabComics={setFavoriteTabComics}
              favoriteTabComics={favoriteTabComics}
              token={token}
              userId={userId}
              setUserId={setUserId}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
