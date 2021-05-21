import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Loader from "./components/Loader";
import Error from "./components/Error";
import axios from "axios";

function App() {
  // Definir el state
  const [busquedaLetra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState("");
  const [loading, guardarLoading] = useState(false);
  const [error, guardarError] = useState(false);

  useEffect(() => {
    if (Object.keys(busquedaLetra).length === 0) return;

    const consultarApiLetra = () => {
      const { artista, cancion } = busquedaLetra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

      guardarLoading(true);

      const resultado = axios(url);

      resultado
        .then((resultado) => {
          guardarLetra(resultado.data.lyrics);
          guardarLoading(false);
          guardarError(false);
        })
        .catch((error) => {
          guardarError(true);
        });
    };

    consultarApiLetra();
  }, [busquedaLetra]);

  return (
    <Fragment>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />

      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-12">
            {error ? (
              <Error mensaje="No Hay resultados" />
            ) : loading ? (
              <Loader />
            ) : (
              <Cancion letra={letra} />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
