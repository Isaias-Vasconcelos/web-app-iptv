import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import channelsTableData from "./data/channelsData.js";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { Card, Icon } from "@mui/material";
import { Navigate, Link, useNavigate } from "react-router-dom";
import api from "utils/backend.js";
import Swal from "sweetalert2";

function Channels() {
  const { columns, rows } = channelsTableData();
  const navigate = useNavigate();

  function removeChannels() {
    Swal.fire({
      text: "Deseja excluir todos os canais?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete("/api/v1/Channel").then((response) => {
          if (response.data.MESSAGE) {
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
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
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
                Canais
              </MDTypography>
              <MDBox display="flex" gap={1}>
                <MDButton
                  variant="outlined"
                  color="error"
                  title="Remover todos os canais"
                  onClick={removeChannels}
                >
                  <Icon>delete</Icon>
                </MDButton>
                <Link to="/canais/adicionar">
                  <MDButton variant="contained" color="light">
                    <Icon>add</Icon>
                  </MDButton>
                </Link>
              </MDBox>
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

export default Channels;
