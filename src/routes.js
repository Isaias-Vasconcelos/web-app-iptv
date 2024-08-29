import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Icon from "@mui/material/Icon";
import Plataformas from "layouts/plataformas";
import AdicionarPlataforma from "layouts/plataformas/add";

const routes = [
  {
    type: "collapse",
    name: "Painel",
    key: "painel",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/painel",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "filmes",
    key: "tables",
    icon: <Icon fontSize="small">movie_creation</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "séries",
    key: "billing",
    icon: <Icon fontSize="small">all_inbox</Icon>,
    route: "/billing",
    component: <Plataformas />,
  },
  {
    type: "collapse",
    name: "plataformas",
    key: "plataformas",
    icon: <Icon fontSize="small">stream</Icon>,
    route: "/plataformas",
    component: <Plataformas />,
  },
  {
    name: "adicionar_plataforma",
    key: "adicionar_plataforma",
    icon: <Icon fontSize="small">stream</Icon>,
    route: "/plataformas/adicionar",
    component: <AdicionarPlataforma />,
  },
];

export default routes;
