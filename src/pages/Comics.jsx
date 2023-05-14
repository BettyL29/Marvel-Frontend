import { useEffect, useState } from "react";
import axios from "axios";
import ComicsBackground from "../img/comics-background.png";

//import component
import Comic from "../assets/components/Comic";

const Comics = ({
  itemsPerPage,
  currentPage,
  setTotalOfPage,
  totalOfPage,
  setCurrentPage,
  search,
  setSearch,
  favoriteTabComics,
  setFavoriteTabComics,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const DataComics = async () => {
      let filter = "";
      if (search) {
        filter = `?limit=${itemsPerPage}&page=1&title=${search}`;
      } else {
        filter = `?limit=${itemsPerPage}&page=${currentPage}`;
      }
      // console.log(filter);
      try {
        const response = await axios.get(
          `http://localhost:3000/comics${filter}`
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
  }, [itemsPerPage, currentPage, search]);

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
        <input
          id="searchComics"
          type="search"
          name="search"
          placeholder="Find your comics here"
          onChange={(event) => {
            setSearch(event.target.value);
            setCurrentPage(1);
          }}
          value={search}
        />
        <Comic
          data={data}
          favoriteTabComics={favoriteTabComics}
          setFavoriteTabComics={setFavoriteTabComics}
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
    </section>
  );
};

export default Comics;
