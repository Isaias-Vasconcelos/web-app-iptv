import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { Card, Icon } from "@mui/material";
import { Link } from "react-router-dom";
import SeriesData from "./data/seriesData";

export default function Series() {
  const { columns, rows } = SeriesData();

  return (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <MDTypography variant="h6" color="white">
                Séries
              </MDTypography>
              <Link to="/series/adicionar">
                <MDButton variant="contained" color="light">
                  <Icon>add</Icon>
                </MDButton>
              </Link>
            </MDBox>
            <MDBox pt={3}>
              <DataTable
                table={{ columns, rows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
