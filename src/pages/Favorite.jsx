import FavoriteCharacters from "../assets/components/FavoriteCharacters";
import FavoriteComics from "../assets/components/favoriteComics";

const Favorite = ({ favoriteTabCharacters, favoriteTabComics }) => {
  return (
    <div className="favorite-page-background">
      <div className="favorite-page">
        <p>MES FAVORIS</p>
        <FavoriteCharacters favoriteTabCharacters={favoriteTabCharacters} />
        <FavoriteComics favoriteTabComics={favoriteTabComics} />
      </div>
    </div>
  );
};

export default Favorite;
