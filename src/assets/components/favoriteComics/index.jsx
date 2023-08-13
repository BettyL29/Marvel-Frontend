import "../FavoriteCharacters/favoriteCharacters.css";

const FavoriteComics = ({ favoriteTabComics, dataFavComics }) => {
  return (
    <div className="favorite-characters">
      <h2>Favorite Comics</h2>
      <div className="favorite-characters-list">
        {/* {favoriteTabComics.map((comic) => {
          return (
            <div key={comic.comicId} className="favorite-characters-details">
              <h3>{comic.name}</h3>
              <div className="favorite-characters-details-picture">
                <img src={comic.picture} alt="" />
              </div>
              <p>{comic.description}</p>
            </div>
          );
        })} */}
        {dataFavComics.map((favComic) => {
          return (
            <div key={favComic.comicId} className="favCharacter-details">
              <h3>{favComic.title}</h3>
              <div className="favorite-character-picture">
                {favComic.picture ? (
                  <img src={favComic.picture} alt="comic cover" />
                ) : (
                  <p>No Cover Found</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoriteComics;
