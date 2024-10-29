import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Icon from "@mui/material/Icon";
import Plataformas from "layouts/plataformas";
import AdicionarPlataforma from "layouts/plataformas/add";
import Movies from "layouts/movies";
import AdicionarFilme from "layouts/movies/registerMovie";
import Channels from "layouts/channels";
import PlayerChannel from "layouts/channels/playerChannel";
import AdicionarLista from "layouts/channels/adicionarLista";
import Series from "layouts/series";
import AdicionarSerie from "layouts/series/registerSeries";
import AdicionarEpisodio from "layouts/series/episodies/registerEpisodie";
import ExibirSerie from "layouts/series/displaySeries";
import Genders from "layouts/genders";
import AdicinarGenero from "layouts/genders/registerGender";
import AdicionarTemporada from "layouts/series/season/registerSeason";
import Users from "layouts/users";
import Basic from "layouts/authentication/sign-in";
import AdicionarUsuario from "layouts/users/registerUser";

const routes = [
  {
    name: "sign-in",
    key: "sign-in",
    route: "/sign-in",
    component: <Basic />,
  },
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
    name: "users",
    key: "users",
    icon: <Icon fontSize="small">stream</Icon>,
    route: "/users",
    component: <Users />,
  },
  {
    name: "adicionar_usuario",
    key: "adicionar_usuario",
    icon: <Icon fontSize="small">stream</Icon>,
    route: "/users/adicionar",
    component: <AdicionarUsuario />,
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
    name: "series",
    key: "series",
    icon: <Icon fontSize="small">all_inbox</Icon>,
    route: "/series",
    component: <Series />,
  },
  {
    name: "adicionar_series",
    key: "adicionar_series",
    icon: <Icon fontSize="small">all_inbox</Icon>,
    route: "/series/adicionar",
    component: <AdicionarSerie />,
  },
  {
    name: "exibir_serie",
    key: "exibir_serie",
    icon: <Icon fontSize="small">all_inbox</Icon>,
    route: "/series/exibir",
    component: <ExibirSerie />,
  },
  {
    name: "adicionar_episodios",
    key: "adicionar_episodies",
    icon: <Icon fontSize="small">all_inbox</Icon>,
    route: "/series/episodios/adicionar",
    component: <AdicionarEpisodio />,
  },
  {
    name: "adicionar_temporadas",
    key: "adicionar_temporadas",
    icon: <Icon fontSize="small">all_inbox</Icon>,
    route: "/temporadas/adicionar",
    component: <AdicionarTemporada />,
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
  {
    type: "collapse",
    name: "Gêneros",
    key: "genders",
    icon: <Icon fontSize="small">stream</Icon>,
    route: "/generos",
    component: <Genders />,
  },
  {
    name: "adicionar_genero",
    key: "adicionar_genero",
    icon: <Icon fontSize="small">stream</Icon>,
    route: "/generos/adicionar",
    component: <AdicinarGenero />,
  },
  {
    type: "collapse",
    name: "Canais",
    key: "channels",
    icon: <Icon fontSize="small">live_tv</Icon>,
    route: "/canais",
    component: <Channels />,
  },
  {
    name: "play_channel",
    key: "pl_channel",
    route: "/canais/play/:tvg_name/:url",
    component: <PlayerChannel />,
  },
  {
    name: "add_channel",
    key: "add_channel",
    route: "/canais/adicionar",
    component: <AdicionarLista />,
  },
];

export default routes;
