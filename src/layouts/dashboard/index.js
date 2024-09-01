import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import dashboardData from "./data/dashboardData.js";

function Dashboard() {
  const { countFilmes, countSeries, countChannels, countPlatforms } = dashboardData();
  return (
    <MDBox py={3}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <DefaultInfoCard
              icon="live_tv"
              title="Canais"
              description="Canais cadastrados"
              value={countChannels}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <DefaultInfoCard
              icon="movie_creation"
              title="Filmes"
              description="Filmes cadastrados"
              value={countFilmes}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <DefaultInfoCard
              icon="all_inbox"
              title="Séries"
              description="Séries cadastradas"
              value={countSeries}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <DefaultInfoCard
              icon="stream"
              title="Plataformas"
              description="Belong Interactive"
              value={countPlatforms}
            />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Dashboard;
