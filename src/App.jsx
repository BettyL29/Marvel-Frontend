import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeartCirclePlus,
  faHeartCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

//import components
import Header from "./assets/components/Header";
import Modal from "./assets/components/Modal";
import Footer from "./assets/components/Footer";

//import page
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Character from "./pages/Character";
import Favorite from "./pages/Favorite";

library.add(faHeartCirclePlus, faHeartCircleMinus);

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [totalOfPage, setTotalOfPage] = useState([]);
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(false);
  const [token, setToken] = useState("");
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
          toggle={toggle}
        />
      )}
      <Header
        display={display}
        setDisplay={setDisplay}
        token={token}
        setToken={setToken}
        setToggle={setToggle}
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
              favoriteTabComics={favoriteTabComics}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
