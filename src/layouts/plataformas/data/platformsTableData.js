import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Não esqueça de importar o PropTypes
import netflix from "assets/images/netflix-icon-transparent-29.jpg";
import hbo from "assets/images/HBO.png";
import prime_video from "assets/images/prime.jpeg";
import disney from "assets/images/disney.jpeg";
import api from "utils/backend";

const Plataforma = ({ image, nome }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={nome} size="sm" />
    <MDBox ml={1} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {nome}
      </MDTypography>
    </MDBox>
  </MDBox>
);

export default function data() {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    api
      .get("/api/v1/Platform")
      .then((response) => {
        setPlatforms(response.data.DATA_RESPONSE_LIST);
      })
      .catch((e) => console.log(e));
  }, []);
  return {
    columns: [{ Header: "Plataforma", accessor: "plataforma", width: "45%", align: "left" }],
    rows: platforms.map((platform) => ({
      plataforma: <Plataforma image={platform.photoUrl} nome={platform.name} />,
    })),
  };
}

Plataforma.propTypes = {
  image: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
};
