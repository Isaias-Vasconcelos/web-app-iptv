import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "utils/backend";

export default function AdicionarPlataforma() {
  const [photoUrl, setPhotoUrl] = useState("");
  const [platName, setPlatName] = useState("");
  const [isError, setIsError] = useState(false);
  let navigate = useNavigate();

  async function Adicionar() {
    await api
      .post("/api/v1/Platform", {
        name: platName,
        photoUrl: photoUrl,
      })
      .then((response) => {
        if (response.data.IS_OPERATION_SUCCESS) {
          navigate(-1);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {});
  }
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
          label="Informe o link da imagem da plataforma"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <MDInput
          required
          label="Informe o nome da plataforma"
          value={platName}
          onChange={(e) => setPlatName(e.target.value)}
        />
        <MDButton variant="gradient" color="info" onClick={Adicionar}>
          Salvar
        </MDButton>
      </MDBox>
    </>
  );
}
