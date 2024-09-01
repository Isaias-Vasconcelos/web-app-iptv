import { useEffect, useState } from "react";
import api from "utils/backend";

export default function data() {
  const [count, setCount] = useState({});

  useEffect(() => {
    api
      .get("/api/v1/Count")
      .then((response) => {
        setCount(response.data.DATA_RESPONSE);
      })
      .catch((e) => console.log(e));
  }, []);

  return count;
}
