import { useEffect, useState } from "react";
import axios from "axios";
import FavoriteCharacters from "../assets/components/FavoriteCharacters";
import FavoriteComics from "../assets/components/favoriteComics";

const Favorite = ({
  favoriteTabCharacters,
  favoriteTabComics,
  setFavoriteTabCharacters,
  setFavoriteTabComics,
  userId,
  token,
}) => {
  const [dataFavCharacters, setDataFavCharacters] = useState([]);
  const [dataFavComics, setDataFavComics] = useState([]);

  console.log(userId);
  console.log(token);

  useEffect(() => {
    const fetchDataFav = async () => {
      const response = await axios.get(
        `https://site--marvel-backend--cqkrrjqcs6yr.code.run/${userId}/favorites`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setDataFavCharacters(response.data.allCharacterFav);
      setFavoriteTabCharacters(response.data.allCharacterFav);
      setDataFavComics(response.data.allComicsFav);
    };
    fetchDataFav();
  }, [userId, token, setFavoriteTabCharacters]);

  return (
    <div className="favorite-page-background">
      <p>MES FAVORIS</p>
      <div className="favorite-section">
        <FavoriteCharacters
          favoriteTabCharacters={favoriteTabCharacters}
          dataFavCharacters={dataFavCharacters}
        />
        <FavoriteComics
          favoriteTabComics={favoriteTabComics}
          dataFavComics={dataFavComics}
        />
      </div>
    </div>
  );
};

export default Favorite;
