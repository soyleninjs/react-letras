import React, { useState } from "react";
import Error from "./Error";
import PropTypes from "prop-types";

const Formulario = ({ guardarBusquedaLetra }) => {
  const [busqueda, guardarBusqueda] = useState({
    artista: "",
    cancion: "",
  });
  const [error, guardarError] = useState(false);

  const { artista, cancion } = busqueda;

  // funcion a cada input para leer su contenido
  const actualizarState = (event) => {
    guardarBusqueda({
      ...busqueda,
      [event.target.name]: event.target.value,
    });
  };

  const buscarInformacion = (event) => {
    event.preventDefault();

    if (artista.trim() === "" || cancion.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);

    // Todo bien, pasar al componente princial
    guardarBusquedaLetra(busqueda);
  };

  return (
    <div className="bg-info">
      <div className="container">
        <div className="row">
          <form
            className="col card text-white bg-transparent mb-5 pt-5 pb-2"
            onSubmit={buscarInformacion}
          >
            <fieldset>
              <legend className="text-center">Buscador Letras Canciones</legend>

              {error && <Error mensaje="Todos los campos son obligatorios" />}

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Artista</label>
                    <input
                      type="text"
                      className="form-control"
                      name="artista"
                      value={artista}
                      placeholder="Nombre Artista"
                      onChange={actualizarState}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Canción</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cancion"
                      value={cancion}
                      placeholder="Nombre Canción"
                      onChange={actualizarState}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary float-right">
                Buscar
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

Formulario.propTypes = {
  guardarBusquedaLetra: PropTypes.func.isRequired,
};

export default Formulario;
