import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "utils/backend";

export default function AdicionarTemporada() {
  const [seasonNumber, setSeasonNumber] = useState(0);
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const { seriesId } = location.state;

  const navigate = useNavigate();

  async function Adicionar() {
    await api
      .post("api/v1/Season", {
        seriesId: seriesId,
        number: seasonNumber,
      })
      .then((response) => {
        if (response.data.IS_OPERATION_SUCCESS === true) {
          navigate(-2);
        } else {
          setIsError(true);
        }
      })
      .catch((error) => {
        console.error(error);
        console.log(error.data);
      });
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
          label="Informe o número da temporada"
          type="number"
          value={seasonNumber}
          onChange={(e) => setSeasonNumber(e.target.value)}
        />
        <MDButton variant="gradient" color="info" onClick={Adicionar}>
          Salvar
        </MDButton>
      </MDBox>
    </>
  );
}
