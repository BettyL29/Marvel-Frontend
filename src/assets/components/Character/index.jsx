import "./character.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Character = ({
  data,
  favoriteTabCharacters,
  setFavoriteTabCharacters,
}) => {
  // console.log(data.results);
  return (
    <section className="character-section">
      {data.results.map((character) => {
        // console.log(character);
        // console.log(character.thumbnail.path);
        // console.log(character.thumbnail.extension);

        const path = character.thumbnail.path;
        const extension = character.thumbnail.extension;

        const image = path + "." + extension;
        // console.log(image);

        const HandleAddToFav = () => {
          const favoriteTabCharactersCopy = [...favoriteTabCharacters];
          // console.log(favoriteTabCopy);
          const FavCharacterExisting = favoriteTabCharactersCopy.find(
            (elem) => elem._id === character._id
          );
          if (!FavCharacterExisting) {
            favoriteTabCharactersCopy.push({
              marvelId: character._id,
              name: character.name,
              picture: image,
              description: character.description,
            });
          }
          // console.log(favoriteTabCharactersCopy);
          const marvelIDStorage = character._id;
          setFavoriteTabCharacters(favoriteTabCharactersCopy);
          localStorage.setItem(`marvelId${marvelIDStorage}`, marvelIDStorage);
          // console.log(favoriteTab);
        };

        return (
          <div key={character._id} className="character-card">
            <div className="character-section-image">
              <div className="favorite-button">
                <button className="favoriteFavIcon" onClick={HandleAddToFav}>
                  <FontAwesomeIcon icon="fa-solid fa-heart-circle-plus" />
                </button>
                <button className="favoriteFavIcon">
                  <FontAwesomeIcon icon="fa-solid fa-heart-circle-minus" />
                </button>
              </div>

              <Link to={`/${character._id}`}>
                <img src={image} alt="" />
              </Link>
            </div>
            <p className="character-card-name">{character.name}</p>
            <div className="character-section-description">
              <p>{character.description}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Character;
