import React, { useEffect, useState } from "react";
import api from "utils/backend";
import { Plataforma } from "components/Global/Plataforma";

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
