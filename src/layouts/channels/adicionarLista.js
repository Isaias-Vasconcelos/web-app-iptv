import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import MDBox from "components/MDBox";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Swal from "sweetalert2";
import api from "utils/backend";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AdicionarLista() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "No file selected.",
        showConfirmButton: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("formFile", file);

    api
      .post("/api/v1/Channel/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.IS_OPERATION_SUCCESS) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: response.data.MESSAGE,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate(-1); // Navigate back to the previous page
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: response.data.MESSAGE,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "An error occurred during the upload.",
          text: error.message,
          showConfirmButton: true,
        });
      });
  };

  return (
    <MDBox display="flex" flexDirection="column" alignItems="center">
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon color="white" />}
      >
        Upload file
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        style={{ marginTop: 16 }}
        disabled={!file} // Disable the upload button if no file is selected
      >
        Upload to API
      </Button>
    </MDBox>
  );
}
