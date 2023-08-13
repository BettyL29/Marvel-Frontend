import "./favoriteCharacters.css";

const FavoriteCharacters = ({ favoriteTabCharacters, dataFavCharacters }) => {
  console.log(dataFavCharacters);
  return (
    <div className="favorite-characters">
      <h2>Favorite Characters</h2>
      <div className="favorite-characters-list">
        {/* ----------------------------LocalStorage methods */}
        {/* {favoriteTabCharacters.map((character) => {
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
        })} */}

        {/* ------------------------------BDD Method */}
        {dataFavCharacters.map((favCharacter) => {
          return (
            <div key={favCharacter.marvelId} className="favCharacter-details">
              <h3>{favCharacter.name}</h3>
              <div className="favorite-character-picture">
                {favCharacter.picture ? (
                  <img src={favCharacter.picture} alt="character head" />
                ) : (
                  <p>No Picture Found</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoriteCharacters;
