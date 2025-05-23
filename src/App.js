import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeDark from "assets/theme-dark";

// RTL plugins
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useAuth, AuthProvider } from "utils/Auth/AuthContext";
import MDButton from "components/MDButton";
import Cookies from "js-cookie";
import MDTypography from "components/MDTypography";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, layout, sidenavColor, transparentSidenav, whiteSidenav, darkMode } =
    controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const { isAuthenticated, logout, authenticate } = useAuth();

  const navigate = useNavigate();

  // Rotas onde a sidebar será ocultada
  const hideSidebarRoutes = ["/sign-in"];
  const shouldHideSidebar = hideSidebarRoutes.includes(pathname);

  // Cache para o RTL
  useMemo(() => {
    const cacheRtl = createCache({
      key: "default", // Usar 'default' para LTR
    });
    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element to 'ltr'
  useEffect(() => {
    document.body.setAttribute("dir", "ltr");
    validatedIfTokenExists();
  }, []);

  useEffect(() => {
    navigate(pathname);
  }, [isAuthenticated]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const validatedIfTokenExists = () => {
    const token = Cookies.get("token");
    if (token) {
      console.log("TOKEN EXISTE!!");
      authenticate();
      console.log(isAuthenticated);
    }
  };

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return route.protected ? (
          <Route
            path={route.route}
            element={isAuthenticated ? route.component : <Navigate to="/sign-in" replace />}
            key={route.key}
          />
        ) : (
          <Route path={route.route} element={route.component} key={route.key} />
        );
      }

      return null;
    });

  const logOut = () => {
    logout();
    removeCookies();
    navigate("/sign-in");
  };

  const removeCookies = () => {
    Cookies.remove("token");
    Cookies.remove("user_role");
  };

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem" // Muda para a direita para o botão de configuração
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />
        {layout === "dashboard" && !shouldHideSidebar && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="AlphaTV"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        {!shouldHideSidebar ? ( // Renderiza o DashboardLayout apenas se não ocultar a barra lateral
          <DashboardLayout>
            <DashboardNavbar />
            <Routes>
              {getRoutes(routes)}
              <Route path="*" element={<Navigate to="/painel" />} />
            </Routes>
            <MDButton Icon="logout" onClick={logOut}>
              <MDTypography>SAIR DA CONTA</MDTypography>
            </MDButton>
          </DashboardLayout>
        ) : (
          <Routes>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/painel" />} />
          </Routes>
        )}
      </ThemeProvider>
    </CacheProvider>
  );
}
