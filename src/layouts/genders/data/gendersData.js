import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import { column } from "stylis";
import api from "utils/backend";
import PropTypes from "prop-types";
import MDAvatar from "components/MDAvatar";

const GendersAvatar = ({ name }) => (
  <MDBox display="flex" lineHeight={1}>
    <MDBox ml={1} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  </MDBox>
);

export default function GendersData() {
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    fetchGenders();
  }, []);

  async function fetchGenders() {
    await api
      .get("api/v1/Gender")
      .then((response) => {
        setGenders(response.data.DATA_RESPONSE_LIST);
      })
      .catch((error) => {
        console.error(error);
        console.error(error.data);
      });
  }

  return {
    columns: [{ Header: "Gênero", accessor: "gender", width: "45%", align: "left" }],
    rows: genders.map((gender) => ({
      gender: <GendersAvatar name={gender.name} />,
    })),
  };
}

GendersAvatar.propTypes = {
  name: PropTypes.string.isRequired,
};
