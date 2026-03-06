import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState([]);
  const [translatedPlot, setTranslatedPlot] = useState("");

  // Função para traduzir usando Google Translate via proxy gratuito
  const translateText = async (text) => {
    try {
      // Usa o endpoint público do Google Translate
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url);
      const data = await response.json();
      // O Google retorna um array complexo, precisamos extrair o texto traduzido
      return data[0].map((item) => item[0]).join("");
    } catch (error) {
      console.error("Erro ao traduzir:", error);
      return text;
    }
  };

  useEffect(() => {
    fetch(`${props.apiUrl}&i=${props.movieID}`)
      .then((response) => response.json())
      .then(async (data) => {
        setMovieDesc(data);
        // Traduzir a sinopse se existir
        if (data.Plot && data.Plot !== "N/A") {
          const translated = await translateText(data.Plot);
          setTranslatedPlot(translated);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={styles.modalBackdrop} onClick={props.click}>
      <div className={styles.movieModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.movieInfo}>
          <img src={movieDesc.Poster} alt="" />

          <button className={styles.btnClose} onClick={props.click}>
            X
          </button>

          <div className={styles.movieType}>
            <div>
              <img src="/favicon.png" alt="" />
              {movieDesc.Type}
              <h1>{movieDesc.Title}</h1>
              <a
                href={`https://google.com/search?q=${encodeURIComponent(movieDesc.Title)}`}
                target="_blank"
              >
                ▶️ Assistir
              </a>
            </div>
          </div>
        </div>
        <div className={styles.containerMisc}>
          <div className={styles.containerFlex}>
            Avaliação: {movieDesc.imdbRating} | Duração: {movieDesc.Runtime} |{" "}
            {movieDesc.Released}
          </div>
          <div className={styles.containerFlex}>
            <p>Elenco: {movieDesc.Actors}</p>
            <p>Gênero: {movieDesc.Genre}</p>
          </div>
        </div>
        <div className={styles.desc}>
          <p>
            Sinopse:{" "}
            {translatedPlot || movieDesc.Plot || "Carregando tradução..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
