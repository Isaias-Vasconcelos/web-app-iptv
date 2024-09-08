import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import { column } from "stylis";
import api from "utils/backend";
import PropTypes from "prop-types";
import MDAvatar from "components/MDAvatar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MDButton from "components/MDButton";
import { Hidden, Icon, Input } from "@mui/material";

const GendersAvatar = ({ name }) => (
  <MDBox display="flex" lineHeight={1}>
    <MDBox ml={1} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  </MDBox>
);

export default function GendersData() {
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    fetchGenders();
  }, []);

  async function fetchGenders() {
    await api
      .get("api/v1/Gender")
      .then((response) => {
        setGenders(response.data.DATA_RESPONSE_LIST);
      })
      .catch((error) => {
        console.error(error);
        console.error(error.data);
      });
  }

  function removeGender(genderId) {
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
          .delete("api/v1/Gender/" + genderId)
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
      { Header: "Gênero", accessor: "gender", width: "45%", align: "left" },
      { Header: "Remover", accessor: "remove_button", width: "45%", align: "left" },
    ],
    rows: genders.map((gender) => ({
      gender: <GendersAvatar name={gender.name} />,
      remove_button: (
        <MDButton variant="outlined" color="error" onClick={() => removeGender(gender.id)}>
          <Icon>delete</Icon>
        </MDButton>
      ),
    })),
  };
}

GendersAvatar.propTypes = {
  name: PropTypes.string.isRequired,
};
