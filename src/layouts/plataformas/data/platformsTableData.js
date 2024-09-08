import React, { useEffect, useState } from "react";
import api from "utils/backend";
import { Plataforma } from "components/Global/Plataforma";
import Swal from "sweetalert2";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";

export default function data() {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    api
      .get("/api/v1/Platform")
      .then((response) => {
        setPlatforms(response.data.DATA_RESPONSE_LIST);
      })
      .catch((e) => console.log(e));
  }, []);

  function removePlatform(platformId) {
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
          .delete("api/v1/Platform/" + platformId)
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
      { Header: "Plataforma", accessor: "plataforma", width: "45%", align: "left" },
      { Header: "Remover", accessor: "remove_button", width: "45%", align: "left" },
    ],
    rows: platforms.map((platform) => ({
      plataforma: <Plataforma image={platform.photoUrl} nome={platform.name} />,
      remove_button: (
        <MDButton variant="outlined" color="error" onClick={() => removePlatform(platform.id)}>
          <Icon>delete</Icon>
        </MDButton>
      ),
    })),
  };
}
