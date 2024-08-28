import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";
import PropTypes from "prop-types"; // Não esqueça de importar o PropTypes
import netflix from "assets/images/netflix-icon-transparent-29.jpg";
import hbo from "assets/images/HBO.png";
import prime_video from "assets/images/prime.jpeg";
import disney from "assets/images/disney.jpeg";

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
  return {
    columns: [{ Header: "Plataforma", accessor: "plataforma", width: "45%", align: "left" }],
    rows: [
      {
        plataforma: <Plataforma image={netflix} nome={`Netflix`} />,
      },
      {
        plataforma: <Plataforma image={hbo} nome={`HBO`} />,
      },
      {
        plataforma: <Plataforma image={prime_video} nome={`Prime Video`} />,
      },
      {
        plataforma: <Plataforma image={disney} nome={`Disney Plus`} />,
      },
    ],
  };
}

Plataforma.propTypes = {
  image: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
};
