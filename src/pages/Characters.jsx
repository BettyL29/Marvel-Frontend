import axios from "axios";
import { useState, useEffect } from "react";
import { AutoComplete } from "primereact/autocomplete";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//---import components
import Hero from "../assets/components/Hero";
import Character from "../assets/components/Character";

//---import style
import backgroundMarvel from "../img/background-marvel-perso.png";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "./characters.css";

const Characters = ({
  itemsPerPage,
  currentPage,
  setCurrentPage,
  totalOfPage,
  setTotalOfPage,
  favoriteTabCharacters,
  setFavoriteTabCharacters,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchCharacter, setSearchCharacter] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selected, setSelected] = useState("");
  const [display, setDisplay] = useState(false);
  const [suggestionsCharacters, setSuggestionsCharacters] = useState([]);
  const [hideFilter, setHideFilter] = useState(false);

  useEffect(() => {
    const DataCharacters = async () => {
      let filter = "";
      if (searchCharacter) {
        filter = `?limit=${itemsPerPage}&page=1&name=${searchCharacter}`;
      } else {
        filter = `?limit=${itemsPerPage}&page=${currentPage}`;
      }

      try {
        const response = await axios.get(
          `https://site--marvel-backend--cqkrrjqcs6yr.code.run/characters${filter}`
          // `http://localhost:3000/characters${filter}`
        );

        setData(response.data);
        setIsLoading(false);

        const totalOfPage = Math.ceil(response.data.count / itemsPerPage);

        const pagination = [];
        for (let i = 1; i <= totalOfPage; i++) {
          pagination.push(i);
        }
        setTotalOfPage(pagination);
      } catch (error) {
        console.log(error);
      }
    };
    DataCharacters();
  }, [currentPage, itemsPerPage, setTotalOfPage, searchCharacter]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 500, behavior: "smooth" });
    setSelectedCharacter(null);
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
    setSelectedCharacter(null);
    window.scrollTo({ top: 500 });
  };

  return isLoading ? (
    <p>Download...</p>
  ) : (
    <main>
      <div className="main-img">
        <img src={backgroundMarvel} alt="" />
      </div>
      <div className="main-container">
        <Hero />
        <h1>All characters</h1>
        <div className="filter-section">
          <div
            className="hideFilter"
            onClick={() => {
              setHideFilter(true);
            }}
          >
            <p>Characters with pictures only</p>
          </div>
          <div
            className="hideFilter"
            onClick={() => {
              setHideFilter(false);
            }}
          >
            <p>All Characters</p>
          </div>
        </div>

        <AutoComplete
          value={searchCharacter}
          suggestions={suggestionsCharacters}
          field="name"
          placeholder="enter your character"
          completeMethod={(e) => {
            setSearchCharacter(e.query);
            const suggestionFilter = data.results.filter((suggestion) => {
              return suggestion.name
                .toLowerCase()
                .startsWith(e.query.toLowerCase());
            });
            setSuggestionsCharacters(suggestionFilter);
          }}
          onChange={(e) => setSearchCharacter(e.value)}
          onSelect={(e) => {
            setSelectedCharacter(e.value);
            setSelected(e.value);
            setSearchCharacter(e.value.name);
          }}
        />

        <Character
          data={data}
          favoriteTabCharacters={favoriteTabCharacters}
          setFavoriteTabCharacters={setFavoriteTabCharacters}
          hideFilter={hideFilter}
          setDisplay={setDisplay}
          display={display}
          setSelectedCharacter={setSelectedCharacter}
        />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={totalOfPage.length}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination-tab"
          pageClassName="pagination-index"
          activeClassName="active-page"
        />

        <div className="chevron-up-button" onClick={handleScrollToTop}>
          <FontAwesomeIcon icon="fa-chevron-up" size={"xl"} />
        </div>
      </div>

      {display && selectedCharacter && (
        <div
          className="modal-section"
          onClick={(e) => {
            if (e.currentTarget === e.target) {
              setDisplay(false);
              setSelectedCharacter(null);
            }
          }}
        >
          <div className="modal">
            <div className="img-modal">
              <img
                src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`}
                alt={selectedCharacter.name}
              />
            </div>

            <div className="left-div-modal">
              <p>{selectedCharacter.name}</p>
              <div>{selectedCharacter.description}</div>
              <Link to={`/${selectedCharacter._id}`}>
                <div className="comics-count-modal">
                  {selectedCharacter.comics.length} comics
                </div>
              </Link>
            </div>
            <div
              className="close-icon-modal"
              onClick={() => {
                setDisplay(false);
                setSelectedCharacter(null);
              }}
            >
              <FontAwesomeIcon icon="fa-xmark" size={"xl"} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Characters;
