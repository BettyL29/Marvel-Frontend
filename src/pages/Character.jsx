import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import backgroundCharacterId from "../img/characterId-back.jpg";

const Character = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { characterId } = useParams();
  //   console.log(characterId);

  useEffect(() => {
    const DataComicCharacterId = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--cqkrrjqcs6yr.code.run/comics/${characterId}`
          // `http://localhost:3000/comics/${characterId}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    DataComicCharacterId();
  }, [characterId]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <section className="characterId-main">
        <div className="backgroundId">
          <img src={backgroundCharacterId} alt="red background" />
        </div>

        <div className="characterId-content">
          <div className="characterId-Presentation">
            <h2>{data.name}</h2>
            <div className="characterId-avatar">
              <img
                src={
                  `${data.thumbnail.path}` + "." + `${data.thumbnail.extension}`
                }
                alt=""
              />
            </div>
            <p>{`Comics in which  ${data.name} appears :`}</p>
          </div>

          <div className="comics-list">
            {data.comics.map((comics) => {
              const path = comics.thumbnail.path;
              const extension = comics.thumbnail.extension;

              const comicImage = path + "." + extension;
              // console.log(comicImage);

              return (
                <div key={comics._id} className="comics-details">
                  <div className="comics-details-right">
                    <div className="comics-details-right-title">
                      <p>{comics.title}</p>
                    </div>

                    <div className="characterId-coverBook">
                      <img src={comicImage} alt="comic book cover" />
                    </div>
                  </div>
                  <div className="description-comic">
                    <p>{comics.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Character;
