import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";
import { Plataforma } from "components/Global/Plataforma";
import MDBadge from "components/MDBadge";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import api from "utils/backend";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";

const Serie = ({ image, nome }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={nome} size="sm" />
    <MDBox ml={1} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {nome}
      </MDTypography>
    </MDBox>
  </MDBox>
);

export default function SeriesData() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    getSeries();
  }, []);

  async function getSeries() {
    await api
      .get("api/v1/Series")
      .then((response) => {
        console.log(response.data);
        setSeries(response.data.DATA_RESPONSE_LIST);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.data);
      });
  }

  function removeSeries(seriesId) {
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
          .delete("api/v1/Series/" + seriesId)
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
      { Header: "Série", accessor: "serie", width: "45%", align: "left" },
      { Header: "Plataforma", accessor: "plataforma", width: "45%", align: "left" },
      { Header: "Genêros", accessor: "generos", width: "45%", align: "left" },
      { Header: "Remover", accessor: "remove_button", width: "45%", align: "left" },
    ],
    rows: series.map((series) => ({
      serie: (
        <Link
          to="/series/exibir"
          state={{
            id: series.id,
            photoUrl: series.photoUrl,
            title: series.title,
            description: series.description,
            platform: series.platform,
            genders: series.genders,
            seasons: series.seasons,
          }}
        >
          <Serie image={series.photoUrl} nome={series.title} />
        </Link>
      ),
      plataforma: <Plataforma image={series.platform.photoUrl} nome={series.platform.name} />,
      generos: (
        <MDBox ml={-1}>
          {series.genders.map((genero) => (
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
        <MDButton variant="outlined" color="error" onClick={() => removeSeries(series.id)}>
          <Icon>delete</Icon>
        </MDButton>
      ),
    })),
  };
}

Serie.propTypes = {
  image: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
};
