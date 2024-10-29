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

  return {
    columns: [
      { Header: "Nome de usuário", accessor: "user_name", width: "20%", align: "left" },
      { Header: "Código do usuário", accessor: "user_code", width: "20%", align: "left" },
      { Header: "Senha", accessor: "password", width: "20%", align: "left" },
      { Header: "Créditos", accessor: "credits", width: "20%", align: "left" },
      { Header: "Tipo", accessor: "user_type", width: "20%", align: "left" },
    ],
    rows: users.map((user) => ({
      user_name: <UserCredential credential={user.userName} />,
      user_code: <UserCredential credential={user.userCode} />,
      password: <UserCredential credential={user.password} />,
      credits: <UserCredential credential={user.credits} />,
      user_type: <UserCredential credential={user.role} />,
    })),
  };
}

UserCredential.propTypes = {
  credential: PropTypes.string.isRequired,
};
