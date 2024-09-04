import { useLocation } from "react-router-dom";
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";

import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import api from "utils/backend";

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
        console.log(response.data);
        setSeasonEpisodies([response.data.DATA_RESPONSE_LIST]);
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
      <MDBox display="flex" justifyContent="center" ml={-130}>
        <MDTypography variant="body1" fontWeight="bold">
          Episódios:
        </MDTypography>
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={1} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {seasonEpisodies.map((episodie) => (
                <div key={episodie.id}>{episodie.title}</div>
              ))}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}
