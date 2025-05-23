import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import platformsTableData from "./data/platformsTableData";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { Card, Icon } from "@mui/material";
import { Navigate, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Plataformas() {
  const { columns, rows } = platformsTableData();

  const navigate = useNavigate();

  function Adicionar() {
    navigate("/plataformas/adicionar");
  }

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
                Plataformas
              </MDTypography>
              <Link to="/plataformas/adicionar">
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

export default Plataformas;
