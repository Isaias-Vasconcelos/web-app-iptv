import { Link, useLocation } from "react-router-dom";
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Icon,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import api from "utils/backend";
import MDButton from "components/MDButton";
import Swal from "sweetalert2";

export default function ExibirSerie() {
  const location = useLocation();
  const { id, photoUrl, title, description, platform, genders, seasons } = location.state;

  const [seasonId, setSeasonId] = useState("");
  const [seasonEpisodies, setSeasonEpisodies] = useState([]);

  useEffect(() => {
    console.log(location.state);
  }, []);

  async function fetchSeasonEpisodies(event) {
    const value = event.target.value;

    await api
      .get("api/v1/Episodie/season/" + value)
      .then((response) => {
        setSeasonEpisodies(response.data.DATA_RESPONSE_LIST);
        console.log(seasonEpisodies);
      })
      .then(() => {
        setSeasonId(value);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.data);
      });
  }

  function removeEpisodie(episodieId) {
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
          .delete("api/v1/Episodie/" + episodieId)
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
            console.log(error.data);
          });
      }
    });
  }

  function removeSeason(seasonId) {
    Swal.fire({
      text: "Deseja excluir este item? OBS: Todos os episódios relacionados á temporada serão excluidos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
    }).then((swalResult) => {
      if (swalResult.isConfirmed) {
        api
          .delete("api/v1/Season/" + seasonId)
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
            console.log(error.data);
          });
      }
    });
  }

  return (
    <MDBox display="flex" flexDirection="column" alignItems="center" lineHeight={1} p={3}>
      <MDAvatar src={photoUrl} name={title} size="lg" sx={{ width: 200, height: 200 }} />
      <MDBox mt={2} textAlign="center">
        <MDTypography display="block" variant="h6" fontWeight="medium" gutterBottom>
          {title}
        </MDTypography>
        <MDTypography display="block" variant="body2" color="textSecondary" paragraph>
          {description}
        </MDTypography>
      </MDBox>
      <MDBox
        mt={2}
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        gap={2}
        width="100%"
      >
        <MDBox textAlign="center">
          <MDTypography variant="body1" fontWeight="bold">
            Plataforma:
          </MDTypography>
          <MDBox display="flex" alignItems="flex-end" mr={-30} gap={1} width="100%">
            <MDAvatar src={platform.photoUrl} sx={{ width: 40, height: 40 }} />
            <MDTypography>{platform.name}</MDTypography>
          </MDBox>
          <MDTypography variant="body1" fontWeight="bold">
            Gêneros:
          </MDTypography>
          <MDBox display="flex" flexWrap="wrap" gap={1}>
            {genders.map((gender) => (
              <MDTypography key={gender.id} variant="body2">
                {gender.name}
              </MDTypography>
            ))}
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox display="flex" alignItems="flex-start" width="100%" mt={-17}>
        <MDBox mt={4} display="flex" flexDirection="column" alignItems="center" gap={2} width="15%">
          <MDTypography variant="h6" color="black">
            Adicionar novos episódios
          </MDTypography>
          <Link to="/series/episodios/adicionar" state={{ seasons: seasons }}>
            <MDButton variant="contained" color="primary">
              <Icon>add</Icon>
            </MDButton>
          </Link>
        </MDBox>
        <MDBox mt={4} display="flex" flexDirection="column" alignItems="center" gap={2} width="15%">
          <MDTypography variant="h6" color="black">
            Adicionar novas temporadas
          </MDTypography>
          <Link to="/temporadas/adicionar" state={{ seriesId: id }}>
            <MDButton variant="contained" color="primary">
              <Icon>add</Icon>
            </MDButton>
          </Link>
        </MDBox>
      </MDBox>
      <MDBox
        display="inline"
        flexDirection="column"
        alignItems="flex-start"
        mt={4}
        width="15%"
        ml={-130}
        textAlign="center"
      >
        <MDBox display="flex" alignItems="flex-start">
          <FormControl required variant="outlined" fullWidth>
            <MDButton variant="outlined" color="error" onClick={() => removeSeason(seasonId)}>
              <Icon>delete</Icon>
            </MDButton>
            <MDTypography variant="body1" fontWeight="bold">
              Temporadas
            </MDTypography>
            <Select value={seasonId} onChange={(e) => fetchSeasonEpisodies(e)}>
              {seasons.map((season) => (
                <MenuItem key={season.id} value={season.id}>
                  {season.number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MDBox>
      </MDBox>
      <MDBox
        mt={4}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap={2}
        width="100%"
      >
        <MDTypography variant="body1" fontWeight="bold">
          Episódios:
        </MDTypography>
        <MDBox display="flex" flexDirection="column" gap={2}>
          {seasonEpisodies.map((episodie) => (
            <Card key={episodie.id} sx={{ width: 600, height: "auto" }}>
              <CardMedia sx={{ height: "auto" }} image={episodie.photoUrl} title={episodie.title} />
              <CardContent>
                <Typography variant="h6">{episodie.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {episodie.description}
                </Typography>
                <MDButton
                  variant="outlined"
                  color="error"
                  onClick={() => removeEpisodie(episodie.id)}
                >
                  <Icon>delete</Icon>
                </MDButton>
              </CardContent>
            </Card>
          ))}
        </MDBox>
      </MDBox>
    </MDBox>
  );
}
