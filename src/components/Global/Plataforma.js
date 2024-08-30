import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const Plataforma = ({ image, nome }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={nome} size="sm" />
    <MDBox ml={1} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {nome}
      </MDTypography>
    </MDBox>
  </MDBox>
);

Plataforma.propTypes = {
  image: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
};
