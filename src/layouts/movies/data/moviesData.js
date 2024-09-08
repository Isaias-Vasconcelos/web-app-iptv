import api from "utils/backend";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Plataforma } from "components/Global/Plataforma";
import Swal from "sweetalert2";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";

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

  function removeMovie(movieId) {
    Swal.fire({
      text: "Deseja excluir este item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
    }).then((swalResult) => {
      if (swalResult.isConfirmed) {
        api
          .delete("api/v1/Movie/" + movieId)
          .then((response) => {
            if (response.data.IS_OPERATION_SUCCESS === true) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: response.data.MESSAGE,
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                window.location.reload();
              });
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: response.data.MESSAGE,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            console.error(error);
            console.error(error.data);
          });
      }
    });
  }

  return {
    columns: [
      { Header: "Filme", accessor: "filme", width: "45%", align: "left" },
      { Header: "Plataforma", accessor: "plataforma", width: "45%", align: "left" },
      { Header: "Genêros", accessor: "generos", width: "45%", align: "left" },
      { Header: "Remover", accessor: "remove_button", width: "45%", align: "left" },
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
      remove_button: (
        <MDButton variant="outlined" color="error" onClick={() => removeMovie(movie.id)}>
          <Icon>delete</Icon>
        </MDButton>
      ),
    })),
  };
}

Filme.propTypes = {
  image: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
};
