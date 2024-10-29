import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "utils/backend";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import { CheckBox } from "@mui/icons-material";
import Cookies from "js-cookie";

export default function AdicionarUsuario() {
  const [userName, setUserName] = useState("");
  const [userCodeAdmin, setUserCodeAdmin] = useState("");
  const [credits, setCredits] = useState();
  const [role, setRole] = useState(0);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const roleOptions = [0, 1, 2];

  const [currentRole, setCurrentRole] = useState("");

  useEffect(() => {
    setCurrentRole(Cookies.get("user_role"));
  }, []);

  const addUser = async () => {
    await api
      .post("api/v1/User/" + validateCheckedRole(), {
        userName: userName,
        userCodeAdmin: userCodeAdmin,
        credits: credits,
        role: role,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.IS_OPERATION_SUCCESS === true) {
          navigate(-1);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => console.log(e));
  };

  const validateCheckedRole = () => {
    if (role === 0) return "CreateUser";
    if (role === 1) return "CreateAdmin";
    if (role === 2) return "CreateSPAdmin";
  };

  return (
    <>
      {isError ?? (
        <MDAlert color="error" dismissible>
          Houve um erro ao adicionar uma nova plataforma
        </MDAlert>
      )}
      <MDBox display="flex" flexDirection="column" gap={5} maxWidth={500}>
        <MDInput
          required
          label="Informe o nome do usuário"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <MDInput
          required
          label="Informe o código do Admin que está criando o usuário"
          value={userCodeAdmin}
          onChange={(e) => setUserCodeAdmin(e.target.value)}
        />
        <MDInput
          required
          label="Informe os créditos do usuário"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
        />
        <FormControl required variant="outlined" fullWidth margin="normal">
          <InputLabel>Informe o tipo de usuário</InputLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            {(currentRole === "SP_ADMIN" || currentRole === "ADMIN") && (
              <MenuItem key={roleOptions[0]} value={roleOptions[0]}>
                <CheckBox></CheckBox>
                {"User"}
              </MenuItem>
            )}

            {currentRole === "SP_ADMIN" && (
              <MenuItem key={roleOptions[1]} value={roleOptions[1]}>
                <CheckBox></CheckBox>
                {"Admin"}
              </MenuItem>
            )}

            {currentRole === "SP_ADMIN" && (
              <MenuItem key={roleOptions[2]} value={roleOptions[2]}>
                <CheckBox></CheckBox>
                {"SuperAdmin"}
              </MenuItem>
            )}
          </Select>
        </FormControl>
        <MDButton variant="gradient" color="info" onClick={addUser}>
          Salvar
        </MDButton>
      </MDBox>
    </>
  );
}
