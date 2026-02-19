import "./App.css";

import logo from "./assets/devflix.png";
import lupa from "./assets/search.svg";
import Rodape from "./components/Rodape/Rodape";

const App = () => {
  return (
    <div id="App">
      <img
        id="logo"
        src={logo}
        alt="Logo da plataforma de streaming DEVFLIX em destaque, com cores vibrantes e design moderno, ideal para quem busca serviços de entretenimento online."
      />

      <div className="search">
        <input type="text" placeholder="Pesquise por filmes e séries..." />
        <img src={lupa} alt="Botão de ação para pesquisa!" />
      </div>

      <Rodape>HillaryCacheiro</Rodape>
    </div>
  );
};

export default App;