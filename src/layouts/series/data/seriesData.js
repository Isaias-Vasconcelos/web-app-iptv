import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";
import { Plataforma } from "components/Global/Plataforma";
import MDBadge from "components/MDBadge";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import api from "utils/backend";
import { Link } from "react-router-dom";

const Serie = ({ image, nome }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={nome} size="sm" />
    <MDBox ml={1} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {nome}
      </MDTypography>
    </MDBox>
  </MDBox>
);

export default function SeriesData() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    getSeries();
  }, []);

  async function getSeries() {
    await api
      .get("api/v1/Series")
      .then((response) => {
        console.log(response.data);
        setSeries(response.data.DATA_RESPONSE_LIST);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.data);
      });
  }

  return {
    columns: [
      { Header: "Série", accessor: "serie", width: "45%", align: "left" },
      { Header: "Plataforma", accessor: "plataforma", width: "45%", align: "left" },
      { Header: "Genêros", accessor: "generos", width: "45%", align: "left" },
    ],
    rows: series.map((series) => ({
      serie: (
        <Link
          to="/series/exibir"
          state={{
            id: series.id,
            photoUrl: series.photoUrl,
            title: series.title,
            description: series.description,
            platform: series.platform,
            genders: series.genders,
            seasons: series.seasons,
          }}
        >
          <Serie image={series.photoUrl} nome={series.title} />
        </Link>
      ),
      plataforma: <Plataforma image={series.platform.photoUrl} nome={series.platform.name} />,
      generos: (
        <MDBox ml={-1}>
          {series.genders.map((genero) => (
            <MDBadge
              key={genero.id}
              badgeContent={genero.name}
              color="dark"
              variant="gradient"
              size="sm"
            />
          ))}
        </MDBox>
      ),
    })),
  };
}

Serie.propTypes = {
  image: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
};
