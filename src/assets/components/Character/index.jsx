import "./character.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

//---import img & icon
import characterID from "../../../img/characterId-back.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Character = ({
  data,
  favoriteTabCharacters,
  setFavoriteTabCharacters,
  hideFilter,
  setDisplay,
  display,
  setSelectedCharacter,
  token,
  favSelect,
  setFavSelect,
}) => {
  // console.log(data.results);

  return (
    <section className="character-section">
      {data.results.map((character) => {
        const path = character.thumbnail.path;
        const extension = character.thumbnail.extension;
        const image = path + "." + extension;

        const isCharacterFavorited =
          favoriteTabCharacters[character._id] || false;

        // LocalStorage method---------------------------------------------
        // const HandleAddToFav = () => {
        //   const favoriteTabCharactersCopy = [...favoriteTabCharacters];
        //   // console.log(favoriteTabCopy);
        //   const FavCharacterExisting = favoriteTabCharactersCopy.find(
        //     (elem) => elem._id === character._id
        //   );
        //   if (!FavCharacterExisting) {
        //     favoriteTabCharactersCopy.push({
        //       marvelId: character._id,
        //       name: character.name,
        //       picture: image,
        //       description: character.description,
        //     });
        //   }
        //   // console.log(favoriteTabCharactersCopy);
        //   const marvelIDStorage = character._id;
        //   setFavoriteTabCharacters(favoriteTabCharactersCopy);
        //   localStorage.setItem(`marvelId${marvelIDStorage}`, marvelIDStorage);
        //   // console.log(favoriteTab);
        // };

        // BDD Stockage method---------------------------------------------
        const handleAddToFavCharacterBDD = async () => {
          token = Cookies.get("tokenMarvel");
          let FavCharacterExisting = "";
          if (
            Array.isArray(favoriteTabCharacters) &&
            favoriteTabCharacters.length > 0
          ) {
            const favoriteTabCharactersCopy = [...favoriteTabCharacters];
            FavCharacterExisting = favoriteTabCharactersCopy.find(
              (elem) => elem._id === character._id
            );
          }

          if (FavCharacterExisting) {
            try {
              const deleteFavCharacter = await axios.delete(
                `https://site--marvel-backend--cqkrrjqcs6yr.code.run/favorites/character/delete`,
                {
                  marvelId: character._id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              setFavoriteTabCharacters((prevFavorites) => ({
                ...prevFavorites,
                [character._id]: false, // Set the favorite status to false
              }));
            } catch (error) {
              console.log(error.message);
            }
          } else {
            try {
              // console.log(data);
              const favCharacter = await axios.post(
                `https://site--marvel-backend--cqkrrjqcs6yr.code.run/favorites/character`,
                {
                  marvelId: character._id,
                  name: character.name,
                  picture: image,
                  description: character.description,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              // console.log(favCharacter);
              setFavoriteTabCharacters((prevFavorites) => ({
                ...prevFavorites,
                [character._id]: true, // Set the favorite status to true
              }));
            } catch (error) {
              console.log(error.message);
            }
          }
        };

        // console.log(character);
        if (hideFilter && image.includes("not_available")) {
          return null;
        } else {
          return (
            <div key={character._id} className="character-card">
              <Link to={`/${character._id}`}>
                <div className="character-section-image">
                  {image.includes("not_available") ? (
                    <img src={characterID} className="character-img" alt="" />
                  ) : (
                    <img src={image} className="character-img" alt="" />
                  )}
                </div>
              </Link>
              <div className="favorite-button">
                <button
                  // onClick={HandleAddToFav}
                  // onClick={handleAddToFavCharacterBDD}
                  onClick={() => {
                    handleAddToFavCharacterBDD();
                    setFavoriteTabCharacters((prevFavorites) => ({
                      ...prevFavorites,
                      [character._id]: !prevFavorites[character._id], // Inverser l'état du favori
                    }));
                  }}
                >
                  <FontAwesomeIcon
                    className={`favoriteFavIcon-${
                      isCharacterFavorited ? "Selected" : "Unselected"
                    }`}
                    icon="fa-heart"
                    size={"xl"}
                  />
                </button>
              </div>

              <div className="character-section-description">
                <p
                  className="character-card-name"
                  onClick={() => {
                    setDisplay(!display);
                    setSelectedCharacter(character);
                  }}
                >
                  {character.name}
                </p>
              </div>
            </div>
          );
        }
      })}
    </section>
  );
};

export default Character;
