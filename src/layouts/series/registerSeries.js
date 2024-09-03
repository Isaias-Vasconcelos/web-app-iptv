import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import { CheckBox } from "@mui/icons-material";
import api from "utils/backend";

export default function AdicionarSerie() {
  const [seriesTitle, setTitle] = useState("");
  const [seriesPhotoUrl, setPhotoUrl] = useState("");
  const [seriesYear, setYear] = useState();
  const [seriesDescription, setDescription] = useState("");
  const [seriesPlatformId, setPlatformId] = useState("");
  const [seriesGenders, setGenders] = useState([]);
  const [seriesSeasons, setSeasons] = useState([]);
  const [isError, setIsError] = useState(false);

  const [allPlatforms, setAllPlatfoms] = useState([]);
  const [allGenders, setAllGenders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPlatforms();
    fetchGenders();
  }, []);

  async function fetchPlatforms() {
    await api
      .get("api/v1/Platform")
      .then((response) => {
        console.log(response.data);
        setAllPlatfoms(response.data.DATA_RESPONSE_LIST);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.data);
      });
  }

  async function fetchGenders() {
    await api
      .get("api/v1/Gender")
      .then((response) => {
        console.log(response.data);
        setAllGenders(response.data.DATA_RESPONSE_LIST);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.data);
      });
  }

  async function Adicionar(params) {
    await api
      .post("api/v1/Series", {
        title: seriesTitle,
        photoUrl: seriesPhotoUrl,
        description: seriesDescription,
        platformId: seriesPlatformId,
        genders: seriesGenders,
        seasons: seriesSeasons,
      })
      .then((response) => {
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

  function checkedGenderValidation(event) {
    const value = event.target.value;

    if (seriesGenders.includes(value)) {
      var valueIndex = movieGenders.indexOf(value);
      seriesGenders.splice(valueIndex);
    }

    setGenders(value);
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
          label="Informe o título da série"
          value={seriesTitle}
          onChange={(e) => setTitle(e.target.value)}
        />
        <MDInput
          required
          label="Informe o link da imagem da seríe"
          value={seriesPhotoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <MDInput
          required
          label="Informe o ano da série"
          value={seriesYear}
          onChange={(e) => setYear(e.target.value)}
        />
        <MDInput
          required
          label="Informe uma descrição sobre a série"
          value={seriesDescription}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl required variant="outlined" fullWidth margin="normal">
          <InputLabel>Informe a plataforma na qual o filme pertence</InputLabel>
          <Select value={seriesPlatformId} onChange={(e) => setPlatformId(e.target.value)}>
            {allPlatforms.map((platform) => (
              <MenuItem key={platform.id} value={platform.id}>
                {platform.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required variant="outlined" fullWidth margin="normal">
          <InputLabel>Informe os gêneros referentes a série</InputLabel>
          <Select multiple value={seriesGenders} onChange={(e) => checkedGenderValidation(e)}>
            {allGenders.map((gender) => (
              <MenuItem key={gender.id} value={gender.id}>
                <CheckBox></CheckBox>
                {gender.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <MDInput
          required
          label="Informe a quantidade de  temporadas da série"
          value={seriesSeasons}
          type="number"
          onChange={(e) => setSeasons([e.target.value])}
        />
        <MDButton variant="gradient" color="info" onClick={Adicionar}>
          Salvar
        </MDButton>
      </MDBox>
    </>
  );
}
