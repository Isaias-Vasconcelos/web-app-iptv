import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { func } from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "utils/backend";

export default function AdicinarGenero() {
  const [genderName, setName] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  function Adicionar() {
    api
      .post("api/v1/Gender", {
        name: genderName,
      })
      .then((response) => {
        if (response.data.IS_OPERATION_SUCCESS === true) {
          navigate(-1);
        } else {
          setIsError(true);
        }
      });
  }

  return (
    <>
      {isError ?? (
        <MDAlert color="error" dismissible>
          Houve um erro ao adicionar um novo gênero
        </MDAlert>
      )}
      <MDBox display="flex" flexDirection="column" gap={5} maxWidth={500}>
        <MDInput
          required
          label="Informe o nome do gênero"
          value={genderName}
          onChange={(e) => setName(e.target.value)}
        ></MDInput>
        <MDButton variant="gradient" color="info" onClick={Adicionar}>
          Salvar
        </MDButton>
      </MDBox>
    </>
  );
}
