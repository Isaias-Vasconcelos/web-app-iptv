import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "utils/backend";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";

const ChannelAvatar = ({ tvg_logo, tvg_name }) => (
  <MDBox display="flex" alignItens="center" lineHeight={1}>
    <MDAvatar
      src={
        tvg_logo == ""
          ? "https://th.bing.com/th/id/OIP.hWY5MI75B-muRjyl3TcTxwHaFj?rs=1&pid=ImgDetMain"
          : tvg_logo
      }
      name={tvg_name}
      size="sm"
    />
    <MDBox ml={1} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {tvg_name}
      </MDTypography>
    </MDBox>
  </MDBox>
);

export default function data() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    api
      .get("/api/v1/Channel")
      .then((response) => {
        setChannels(response.data.DATA_RESPONSE_LIST);
      })
      .catch((e) => console.log(e));
  }, []);

  return {
    columns: [
      { Header: "Canal", accessor: "channel", width: "45%", align: "left" },
      { Header: "Grupo", accessor: "group", width: "45%", align: "left" },
      { Header: "Teste", accessor: "link_test", width: "45%", align: "left" },
    ],
    rows: channels.map((channel) => ({
      channel: <ChannelAvatar tvg_logo={channel.tvgLogo} tvg_name={channel.tvgName} />,
      group: (
        <MDBadge badgeContent={channel.groupTitle} color="dark" variant="gradient" size="sm" />
      ),
      link_test: (
        <Link
          to={`/canais/play/${encodeURIComponent(channel.tvgName)}/${encodeURIComponent(
            channel.url
          )}`}
        >
          <Icon fontSize="small">play_circle</Icon>
        </Link>
      ),
    })),
  };
}

ChannelAvatar.propTypes = {
  tvg_logo: PropTypes.string.isRequired,
  tvg_name: PropTypes.string.isRequired,
};
