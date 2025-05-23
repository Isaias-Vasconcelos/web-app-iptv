import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "utils/backend";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { FormControl, MenuItem, Select } from "@mui/material";
import MDTypography from "components/MDTypography";

export default function AdicionarEpisodio() {
  const [episodieSeasonId, setSeasonId] = useState("");
  const [episodieTitle, setTitle] = useState("");
  const [episodieDescription, setDescription] = useState("");
  const [episodieUrl, setEpisodieUrl] = useState("");
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const { seasons } = location.state;

  const navigate = useNavigate();

  async function Adicionar() {
    await api
      .post("api/v1/Episodie", {
        seasonId: episodieSeasonId,
        episodies: [
          {
            title: episodieTitle,
            description: episodieDescription,
            episodieUrl: episodieUrl,
          },
        ],
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.IS_OPERATION_SUCCESS === true) {
          navigate(-1);
        } else {
          setIsError(true);
        }
      })
      .catch((error) => {
        console.log(error);
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
        <FormControl required variant="outlined" fullWidth margin="normal">
          <MDTypography variant="body2" fontWeight="bold">
            Temporadas
          </MDTypography>
          <Select value={episodieSeasonId} onChange={(e) => setSeasonId(e.target.value)}>
            {seasons.map((season) => (
              <MenuItem key={season.id} value={season.id}>
                {season.number}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <MDInput
          required
          label="Informe o título do episódio"
          value={episodieTitle}
          onChange={(e) => setTitle(e.target.value)}
        />
        <MDInput
          required
          label="Informe uma descrição sobre o episódio"
          value={episodieDescription}
          onChange={(e) => setDescription(e.target.value)}
        />
        <MDInput
          required
          label="Informe o link do conteúdo do episódio"
          value={episodieUrl}
          onChange={(e) => setEpisodieUrl(e.target.value)}
        />
        <MDButton variant="gradient" color="info" onClick={Adicionar}>
          Salvar
        </MDButton>
      </MDBox>
    </>
  );
}
