import api from "utils/backend";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Plataforma } from "components/Global/Plataforma";

const Filme = ({ image, nome }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={nome} size="sm" />
    <MDBox ml={1} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {nome}
      </MDTypography>
    </MDBox>
  </MDBox>
);

export default function data() {
  const [movies, setMovies] = useState([]);

  const getFilmes = async () => {
    await api
      .get("/api/v1/Movie")
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.DATA_RESPONSE_LIST);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getFilmes();
  }, []);

  return {
    columns: [
      { Header: "Filme", accessor: "filme", width: "45%", align: "left" },
      { Header: "Plataforma", accessor: "plataforma", width: "45%", align: "left" },
      { Header: "Genêros", accessor: "generos", width: "45%", align: "left" },
    ],
    rows: movies.map((movie) => ({
      filme: <Filme image={movie.photoUrl} nome={movie.title} />,
      plataforma: <Plataforma image={movie.platform.photoUrl} nome={movie.platform.name} />,
      generos: (
        <MDBox ml={-1}>
          {movie.genders.map((genero) => (
            <MDBadge
              key={genero.id}
              badgeContent={genero.name}
              color="dark"
              variant="gradient"
              size="sm"
            />
          ))}
        </MDBox>
      ),
    })),
  };
}

Filme.propTypes = {
  image: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
};
