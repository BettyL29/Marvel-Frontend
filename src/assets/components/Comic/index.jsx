import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./comic.css";

const Comic = ({ data, favoriteTabComics, setFavoriteTabComics }) => {
  // console.log(data);
  return (
    <div>
      <div className="comic-card">
        {data.results.map((comic) => {
          console.log(comic);
          const path = comic.thumbnail.path;
          const extension = comic.thumbnail.extension;

          const image = path + "." + extension;
          // console.log(image);

          const HandleAddToFav = () => {
            const favoriteTabComicsCopy = [...favoriteTabComics];
            // console.log(favoriteTabCopy);
            const FavComicExisting = favoriteTabComicsCopy.find(
              (elem) => elem._id === comic._id
            );
            if (!FavComicExisting) {
              favoriteTabComicsCopy.push({
                comicId: comic._id,
                title: comic.title,
                picture: image,
                description: comic.description,
              });
            }
            // console.log(favoriteTabComicsCopy);
            const comicIdStorage = comic._id;
            setFavoriteTabComics(favoriteTabComicsCopy);
            localStorage.setItem(`comicId${comicIdStorage}`, comicIdStorage);
            // console.log(favoriteTab);
          };

          return (
            <div key={comic._id} className="comic-card-details">
              <button className="favoriteFavIcon" onClick={HandleAddToFav}>
                <FontAwesomeIcon icon="fa-solid fa-heart-circle-plus" />
              </button>
              <div className="comic-card-img">
                <img src={image} alt="" />
              </div>
              <p className="comic-card-title">{comic.title}</p>
              <p className="comic-card-description">{comic.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comic;
