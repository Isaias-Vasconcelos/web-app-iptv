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

export default function AdicionarFilme() {
  const [movieTitle, setTitle] = useState("");
  const [moviePhotoUrl, setPhotoUrl] = useState("");
  const [movieUrl, setMovieUrl] = useState("");
  const [movieYear, setYear] = useState();
  const [movieDescription, setDescription] = useState("");
  const [moviePlatform, setPlatform] = useState("");
  const [movieGenders, setGenders] = useState([]);
  const [isError, setIsError] = useState(false);

  const [allPlatforms, setAllPlatforms] = useState([]);
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
        setAllPlatforms(response.data.DATA_RESPONSE_LIST);
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
        setAllGenders(response.data.DATA_RESPONSE_LIST);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.data);
      });
  }

  async function Adicionar() {
    await api
      .post("api/v1/Movie", {
        title: movieTitle,
        photoUrl: moviePhotoUrl,
        movieUrl: movieUrl,
        year: movieYear,
        description: movieDescription,
        platform: moviePlatform,
        genders: movieGenders,
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
        console.log(response.data);
      });
  }

  function checkedGenderValidation(event) {
    const value = event.target.value;

    if (movieGenders.includes(value)) {
      var valueIndex = movieGenders.indexOf(value);
      movieGenders.splice(valueIndex);
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
          label="Informe o título do filme"
          value={movieTitle}
          onChange={(e) => setTitle(e.target.value)}
        />
        <MDInput
          required
          label="Informe o link da imagem do filme"
          value={moviePhotoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <MDInput
          required
          label="Informe o link do conteúdo do filme"
          value={movieUrl}
          onChange={(e) => setMovieUrl(e.target.value)}
        />
        <MDInput
          required
          label="Informe o ano do filme"
          value={movieYear}
          onChange={(e) => setYear(e.target.value)}
        />
        <MDInput
          required
          label="Informe uma descrição sobre o filme"
          value={movieDescription}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl required variant="outlined" fullWidth margin="normal">
          <InputLabel>Informe a plataforma na qual o filme pertence</InputLabel>
          <Select value={moviePlatform} onChange={(e) => setPlatform(e.target.value)}>
            {allPlatforms.map((platform) => (
              <MenuItem key={platform.id} value={platform.id}>
                {platform.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required variant="outlined" fullWidth margin="normal">
          <InputLabel>Informe os gêneros referentes ao filme</InputLabel>
          <Select multiple value={movieGenders} onChange={(e) => checkedGenderValidation(e)}>
            {allGenders.map((gender) => (
              <MenuItem key={gender.id} value={gender.id}>
                <CheckBox></CheckBox>
                {gender.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <MDButton variant="gradient" color="info" onClick={Adicionar}>
          Salvar
        </MDButton>
      </MDBox>
    </>
  );
}
