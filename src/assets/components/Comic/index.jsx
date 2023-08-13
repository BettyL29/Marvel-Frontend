import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";

//---import style
import "./comic.css";
import backgroundMarvel from "../../../img/background-marvel-perso.png";

const Comic = ({
  data,
  favoriteTabComics,
  setFavoriteTabComics,
  filterComics,
  setDisplayComic,
  setSelectedComic,
  token,
}) => {
  // console.log(data);
  return (
    <div>
      <div className="comic-card">
        {data.results.map((comic) => {
          // console.log(comic);
          const path = comic.thumbnail.path;
          const extension = comic.thumbnail.extension;

          const image = path + "." + extension;
          // console.log(image);

          // LocalStorage method---------------------------------------------
          // const HandleAddToFav = () => {
          //   const favoriteTabComicsCopy = [...favoriteTabComics];
          //   // console.log(favoriteTabCopy);
          //   const FavComicExisting = favoriteTabComicsCopy.find(
          //     (elem) => elem._id === comic._id
          //   );
          //   if (!FavComicExisting) {
          //     favoriteTabComicsCopy.push({
          //       comicId: comic._id,
          //       title: comic.title,
          //       picture: image,
          //       description: comic.description,
          //     });
          //   }
          //   // console.log(favoriteTabComicsCopy);
          //   const comicIdStorage = comic._id;
          //   setFavoriteTabComics(favoriteTabComicsCopy);
          //   localStorage.setItem(`comicId${comicIdStorage}`, comicIdStorage);
          //   // console.log(favoriteTab);
          // };

          // BDD Stockage method---------------------------------------------
          const handleAddToFavComicBDD = async () => {
            token = Cookies.get("tokenMarvel");

            try {
              console.log(data);
              const favComic = await axios.post(
                `https://site--marvel-backend--cqkrrjqcs6yr.code.run/favorites/comic`,
                {
                  comicId: comic._id,
                  title: comic.title,
                  picture: image,
                  description: comic.description,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              // console.log(favComic);
            } catch (error) {
              console.log(error.message);
            }
          };

          if (filterComics && image.includes("not_available")) {
            return null;
          } else {
            return (
              <div key={comic._id} className="comic-card-details">
                <button
                  className="favoriteFavIcon"
                  onClick={handleAddToFavComicBDD}
                >
                  <FontAwesomeIcon icon="fa-heart" size={"xl"} />
                </button>
                <div
                  className="comic-card-img"
                  onClick={() => {
                    setDisplayComic(true);
                    setSelectedComic(comic);
                  }}
                >
                  {image.includes("not_available") ? (
                    <img src={backgroundMarvel} className="comic-img" alt="" />
                  ) : (
                    <img src={image} alt="Comic Thumbnail" />
                  )}
                </div>
                <p className="comic-card-title">{comic.title}</p>
                {/* <p className="comic-card-description">{comic.description}</p> */}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Comic;
