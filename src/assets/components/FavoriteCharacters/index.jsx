import "./favoriteCharacters.css";

const FavoriteCharacters = ({ favoriteTabCharacters }) => {
  return (
    <div className="favorite-characters">
      <h2>Favorite Characters</h2>
      <div className="favorite-characters-list">
        {favoriteTabCharacters.map((character) => {
          return (
            <div
              key={character.marvelId}
              className="favorite-characters-details"
            >
              <h3>{character.name}</h3>
              <div className="favorite-characters-details-picture">
                <img src={character.picture} alt="" />
              </div>
              <p>{character.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoriteCharacters;
