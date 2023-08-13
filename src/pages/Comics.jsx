import { useEffect, useState } from "react";
import axios from "axios";
import { AutoComplete } from "primereact/autocomplete";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import component
import Comic from "../assets/components/Comic";

//import style
import ComicsBackground from "../img/comics-background.png";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "./comics.css";

const Comics = ({
  itemsPerPage,
  setTotalOfPage,
  totalOfPage,
  favoriteTabComics,
  setFavoriteTabComics,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchComics, setSearchComics] = useState("");
  const [selectedComic, setSelectedComic] = useState(null);
  const [currentPageComic, setCurrentPageComic] = useState(1);
  const [filterComics, setFilterComics] = useState(false);
  const [suggestionComics, setSuggestionsComics] = useState([]);
  const [displayComic, setDisplayComic] = useState(false);

  useEffect(() => {
    const DataComics = async () => {
      let filter = "";
      if (searchComics) {
        filter = `?limit=${itemsPerPage}&page=1&title=${searchComics}`;
      } else {
        filter = `?limit=${itemsPerPage}&page=${currentPageComic}`;
      }
      // console.log(filter);
      try {
        const response = await axios.get(
          `https://site--marvel-backend--cqkrrjqcs6yr.code.run/comics${filter}`
          // `http://localhost:3000/comics${filter}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);

        const totalOfPage = Math.ceil(response.data.count / itemsPerPage);
        // console.log(totalOfPage);
        const pagination = [];
        for (let i = 1; i <= totalOfPage; i++) {
          pagination.push(i);
        }
        // console.log(pagination);
        setTotalOfPage(pagination);
      } catch (error) {
        console.log(error);
      }
    };
    DataComics();
    window.scrollTo({ top: 0 });
  }, [itemsPerPage, currentPageComic, searchComics, setTotalOfPage]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPageComic(selectedPage);
    setSelectedComic(null);
    window.scrollTo({ top: 500 });
  };

  return isLoading ? (
    <p>Download...</p>
  ) : (
    <section className="comics-section">
      <img
        // className="comics-section-background"
        src={ComicsBackground}
        alt="red background"
      />
      <div className="comic-section-details">
        <h1>Liste des comics</h1>

        <div className="filter-section">
          <div
            className="hideFilter"
            onClick={() => {
              setFilterComics(true);
            }}
          >
            <p>Comics with cover only</p>
          </div>
          <div
            className="hideFilter"
            onClick={() => {
              setFilterComics(false);
            }}
          >
            <p>All Comics</p>
          </div>
        </div>

        <AutoComplete
          value={searchComics}
          suggestions={suggestionComics}
          field="title"
          placeholder="enter your comic"
          completeMethod={(e) => {
            setSearchComics(e.query);
            if (e.query.trim() === "") {
              setSelectedComic(null);
              setSuggestionsComics([]);
            } else {
              const suggestionFilterComics = data.results.filter(
                (suggestion) => {
                  return suggestion.title
                    .toLowerCase()
                    .includes(e.query.toLowerCase());
                }
              );
              setSuggestionsComics(suggestionFilterComics);
            }
          }}
          onChange={(e) => {
            setSearchComics(e.value);
          }}
          onSelect={(e) => {
            setSelectedComic(e.value);
            setSuggestionsComics([]);
            setSearchComics(e.value.title);
          }}
        />

        <Comic
          data={data}
          favoriteTabComics={favoriteTabComics}
          setFavoriteTabComics={setFavoriteTabComics}
          filterComics={filterComics}
          setDisplayComic={setDisplayComic}
          displayComic={displayComic}
          setSelectedComic={setSelectedComic}
        />

        <div className="chevron-up-button" onClick={handleScrollToTop}>
          <FontAwesomeIcon icon="fa-chevron-up" size={"xl"} />
        </div>

        {displayComic && selectedComic && (
          <div
            className="modal-section-comic"
            onClick={(e) => {
              if (e.currentTarget === e.target) {
                setDisplayComic(false);
                setSelectedComic(null);
              }
            }}
          >
            <div className="modal">
              <div className="img-modal">
                <img
                  src={`${selectedComic.thumbnail.path}.${selectedComic.thumbnail.extension}`}
                  alt={selectedComic.title}
                />
              </div>

              <div className="left-div-modal">
                <p>{selectedComic.title}</p>
                <div>{selectedComic.description}</div>
              </div>
              <div
                className="close-icon-modal"
                onClick={() => {
                  setDisplayComic(false);
                  setSelectedComic(null);
                }}
              >
                <FontAwesomeIcon icon="fa-xmark" size={"xl"} />
              </div>
            </div>
          </div>
        )}

        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          previousLabel="< previous"
          pageRangeDisplayed={5}
          renderOnZeroPageCount={null}
          pageCount={totalOfPage.length}
          onPageChange={handlePageClick}
          className="pagination-tab-comics"
          pageClassName="pagination-index-comics"
          activeClassName="active-page"
        ></ReactPaginate>
      </div>
    </section>
  );
};

export default Comics;
