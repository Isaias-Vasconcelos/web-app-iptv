import React, { useEffect, useRef } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Hls from "hls.js";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const PlayerChannel = () => {
  const videoRef = useRef(null);
  const { tvg_name, url } = useParams();

  console.log("Channel Name:", tvg_name);
  console.log("URL:", url);

  useEffect(() => {
    const video = videoRef.current;
    const decodedUrl = decodeURIComponent(url);

    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();

        hls.loadSource(decodedUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("Manifest parsed, starting playback");
          video.play().catch((error) => console.error("Playback error:", error));
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error("HLS.js Error:", data.fatal);
        });

        return () => {
          hls.destroy();
        };
      } else {
        console.error("Hls.js is not supported in this browser");
        video.src = decodedUrl;
      }
    }
  }, [url]);

  return (
    <MDBox display="flex" flexDirection="column">
      <MDTypography variant="h6">{tvg_name}</MDTypography>
      {url.includes(".mp4") ? (
        <>
          <video src={url} controls></video>
        </>
      ) : (
        <video ref={videoRef} controls>
          Seu navegador não suporta reprodução
        </video>
      )}
    </MDBox>
  );
};

PlayerChannel.propTypes = {
  tvg_name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default PlayerChannel;
