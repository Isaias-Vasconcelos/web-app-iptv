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

export default function ExibirSerie() {
  const location = useLocation();
  const { id, photoUrl, title, description, platform, genders, seasons } = location.state;

  const [seasonId, setSeasonId] = useState("");
  const [seasonEpisodies, setSeasonEpisodies] = useState([]);

  async function fetchSeasonEpisodies(event) {
    const value = event.target.value;

    await api
      .get("api/v1/Episodie/season/" + value)
      .then((response) => {
        setSeasonEpisodies(response.data.DATA_RESPONSE_LIST);
        console.log(seasonEpisodies);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.data);
      });
  }

  useEffect(() => {
    console.log(location.state);
  }, []);

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
      <MDBox mt={2} display="flex" justifyContent="center">
        <MDBox textAlign="center" ml={100}>
          <MDTypography variant="body1" fontWeight="bold">
            Plataforma:
          </MDTypography>
          <MDBox display="flex" justifyContent="space-between" gap="10px">
            <MDAvatar src={platform.photoUrl} sx={{ top: "-8px" }}></MDAvatar>
            <MDTypography>{platform.name}</MDTypography>
          </MDBox>
          <MDTypography variant="body1" fontWeight="bold">
            Gêneros:
          </MDTypography>
          <MDBox display="flex" justifyContent="space-between" gap="10px">
            <MDTypography>
              {genders.map((gender) => (
                <div key={gender.id}>{gender.name}</div>
              ))}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox display="flex" justifyContent="center" ml={-100} mt={-25}>
        <FormControl required variant="outlined" fullWidth margin="normal">
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
      <MDBox
        ml={-150}
        mt={-7}
        mb={7}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <MDTypography variant="h6" color="black">
          Adicionar novos episódios
        </MDTypography>
        <Link to="/series/episodios/adicionar" state={{ seasons: seasons }}>
          <MDButton variant="contained" color="primary">
            <Icon>add</Icon>
          </MDButton>
        </Link>
      </MDBox>
      <MDBox display="flex" justifyContent="center" ml={-100}>
        <MDTypography variant="body1" fontWeight="bold">
          Episódios:
        </MDTypography>
        <MDBox>
          {seasonEpisodies.map((episodie) => (
            <Card key={episodie.id} sx={{ width: 400, height: "auto", mb: 2, ml: 2 }}>
              <CardMedia sx={{ width: "auto", height: 10, fontSize: 14 }} fontWeight="bold">
                {episodie.title}
              </CardMedia>
              <CardContent sx={{ flex: 1, overflow: "auto" }}>
                <Typography variant="body2" color="textSecondary" ml={-1} fontSize={13}>
                  {episodie.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </MDBox>
      </MDBox>
    </MDBox>
  );
}
