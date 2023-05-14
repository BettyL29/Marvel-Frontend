import Hero from "../assets/components/Hero";
import Character from "../assets/components/Character";
import backgroundMarvel from "../img/background-marvel-perso.png";
import axios from "axios";
import { useState, useEffect } from "react";

const Characters = ({
  itemsPerPage,
  currentPage,
  setCurrentPage,
  totalOfPage,
  setTotalOfPage,
  search,
  setSearch,
  favoriteTabCharacters,
  setFavoriteTabCharacters,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const DataCharacters = async () => {
      let filter = "";
      if (search) {
        filter = `?limit=${itemsPerPage}&page=1&name=${search}`;
      } else {
        filter = `?limit=${itemsPerPage}&page=${currentPage}`;
      }

      // console.log(filter);
      try {
        const response = await axios.get(
          `http://localhost:3000/characters${filter}`
        );
        // console.log(response.data);
        // console.log(response.data.results);
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
    DataCharacters();
    window.scrollTo({ top: 0 });
  }, [currentPage, itemsPerPage, setTotalOfPage, search]);

  //Futur button go back to top of the page
  // const handleScrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

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
        <input
          id="searchCharacters"
          type="search"
          name="search"
          placeholder="Find your character here"
          onChange={(event) => {
            setSearch(event.target.value);
            setCurrentPage(1);
          }}
          value={search}
        />
        <Character
          data={data}
          favoriteTabCharacters={favoriteTabCharacters}
          setFavoriteTabCharacters={setFavoriteTabCharacters}
        />
        <div className="pagination-index">
          {totalOfPage.map((pageNumber) => {
            // console.log(pageNumber);
            return (
              <button
                onClick={() => {
                  setCurrentPage(pageNumber);
                }}
                key={pageNumber}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Characters;
