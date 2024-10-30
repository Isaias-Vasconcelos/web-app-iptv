import api from "utils/backend";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";
import Cookies from "js-cookie";

const UserCredential = ({ credential }) => (
  <MDBox display="flex" lineHeight={1}>
    <MDBox ml={1} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {credential}
      </MDTypography>
    </MDBox>
  </MDBox>
);

export default function usersData() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    await api
      .get("api/v1/User")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.DATA_RESPONSE_LIST);
      })
      .catch((e) => console.log(e));
  };

  const removeUser = async (id, role) => {
    const userRole = Cookies.get("user_role");
    if (validateRoles(role, userRole)) {
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
            .delete("api/v1/User/" + id)
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
  };

  const validateRoles = (role, userRole) => {
    if (role === "ADMIN" && userRole === "ADMIN") {
      Swal.fire({
        text: "Não é possível remover um ADMIN sendo um ADMIN",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
      return false;
    }
    if (role === "SP_ADMIN" && userRole === "ADMIN") {
      Swal.fire({
        text: "Não é possível remover um SuperAdmin sendo um ADMIN",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
      return false;
    }

    return true;
  };

  return {
    columns: [
      { Header: "Nome de usuário", accessor: "user_name", width: "20%", align: "left" },
      { Header: "Código do usuário", accessor: "user_code", width: "20%", align: "left" },
      { Header: "Senha", accessor: "password", width: "20%", align: "left" },
      { Header: "Créditos", accessor: "credits", width: "20%", align: "left" },
      { Header: "Tipo", accessor: "user_type", width: "20%", align: "left" },
      { Header: "Remover", accessor: "remove_button", width: "45%", align: "left" },
    ],
    rows: users.map((user) => ({
      user_name: <UserCredential credential={user.userName} />,
      user_code: <UserCredential credential={user.userCode} />,
      password: <UserCredential credential={user.password} />,
      credits: <UserCredential credential={user.credits} />,
      user_type: <UserCredential credential={user.role} />,
      remove_button: (
        <MDButton variant="outlined" color="error" onClick={() => removeUser(user.id, user.role)}>
          <Icon>delete</Icon>
        </MDButton>
      ),
    })),
  };
}

UserCredential.propTypes = {
  credential: PropTypes.string.isRequired,
};
