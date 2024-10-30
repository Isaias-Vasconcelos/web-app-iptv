import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import api from "utils/backend";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "utils/Auth/AuthContext";
import Swal from "sweetalert2";

function Basic() {
  const [userCode, setUserCode] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate();

  const { isAuthenticated, authenticate } = useAuth();

  const login = async () => {
    await api
      .post("api/v1/Auth", {
        userCode: userCode,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        Cookies.set("token", response.data.token, { expires: 1, path: "/", secure: true });
        if (validateUserRole(response.data.token)) {
          authenticate();
          navigator("/painel");
        }
      })
      .catch((e) => console.log(e));
  };

  const validateUserRole = (token) => {
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    if (role === "USER") {
      showLoginPermissionError();
      return false;
    }
    Cookies.set("user_role", role, { expires: 1, path: "/", secure: true });
    return true;
  };

  const showLoginPermissionError = () => {
    Swal.fire({
      text: "Este tipo de usuário não é permitido no painel",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    }).then((swalResult) => {
      if (swalResult.isConfirmed) {
        window.location.reload();
      }
    });
  };

  return (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        width: "100%",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 400, boxShadow: 3 }}>
        <MDBox
          display="flex"
          justifyContent="center"
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Login
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                required
                type="number"
                label="Código de usuário"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                required
                type="password"
                label="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={login} fullWidth>
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </MDBox>
  );
}

export default Basic;
