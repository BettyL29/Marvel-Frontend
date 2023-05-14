import "../FavoriteCharacters/favoriteCharacters.css";

const FavoriteComics = ({ favoriteTabComics }) => {
  return (
    <div className="favorite-characters">
      <h2>Favorite Comics</h2>
      <div className="favorite-characters-list">
        {favoriteTabComics.map((comic) => {
          return (
            <div key={comic.comicId} className="favorite-characters-details">
              <h3>{comic.name}</h3>
              <div className="favorite-characters-details-picture">
                <img src={comic.picture} alt="" />
              </div>
              <p>{comic.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoriteComics;
