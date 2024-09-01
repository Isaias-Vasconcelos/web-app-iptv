import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Icon from "@mui/material/Icon";
import Plataformas from "layouts/plataformas";
import AdicionarPlataforma from "layouts/plataformas/add";
import Movies from "layouts/movies";
import AdicionarFilme from "layouts/movies/registerMovie";

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
    name: "movies",
    key: "movies",
    icon: <Icon fontSize="small">movie_creation</Icon>,
    route: "/filmes",
    component: <Movies />,
  },
  {
    name: "adicionar_filme",
    key: "adicionar_filme",
    icon: <Icon fontSize="small">movie_creation</Icon>,
    route: "/filmes/adicionar",
    component: <AdicionarFilme />,
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
