import { useLocation } from "react-router-dom";
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";

import { useEffect } from "react";

export default function ExibirSerie() {
  const location = useLocation();
  const { id, photoUrl, title, description, platform, genders } = location.state;

  useEffect(() => {
    console.log(location.state);
  }, []);

  return (
    <MDBox display="flex" flexDirection="column" alignItems="center" lineHeight={1} p={3}>
      <MDAvatar src={photoUrl} name={title} size="lg" sx={{ width: 200, height: 200 }} />
      <MDBox mt={2} textAlign="center">
        <MDTypography display="block" variant="h6" fontWeight="medium" gutterBottom>
          {title}
        </MDTypography>
        <MDTypography display="block" variant="body2" color="textSecondary" paragraph>
          {description}
        </MDTypography>
      </MDBox>
      <MDBox mt={2} display="flex" justifyContent="center">
        <MDBox textAlign="center" ml={100}>
          <MDTypography variant="body1" fontWeight="bold">
            Plataforma:
          </MDTypography>
          <MDBox display="flex" justifyContent="space-between" gap="10px">
            <MDAvatar src={platform.photoUrl} sx={{ top: "-8px" }}></MDAvatar>
            <MDTypography>{platform.name}</MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}
