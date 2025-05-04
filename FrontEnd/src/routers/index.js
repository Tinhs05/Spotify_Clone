// Page
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Admin from "../pages/Admin";
import QL_AudioMusic from "../pages/QL_AudioMusic";
import TrangChu from "../pages/TrangChu";

// Layout
import LoginLayout from "../components/Layouts/LoginLayout";
import ClientLayout from "../components/Layouts/ClientLayout";
import AdminLayout from "../components/Layouts/AdminLayout";

// Admin routes
const adminRoutes = [
    // { path: "/admin/audio-music", component: QL_AudioMusic, layout: AdminLayout },
    { path: '/admin/*', component: Admin, layout: AdminLayout },
];

// Client routes
const clientRoutes = [
    { path: "/home", component: TrangChu, layout: ClientLayout },
    { path: "/playlist/:idPlaylist", component: TrangChu, layout: ClientLayout },
    { path: "/favorite/:idFavorite", component: TrangChu, layout: ClientLayout },
    { path: "/track/:idTrack", component: TrangChu, layout: ClientLayout },
    { path: "/genre/:idGenre", component: TrangChu, layout: ClientLayout },
    { path: "/search/:nameTrack", component: TrangChu, layout: ClientLayout },
    { path: "/video", component: TrangChu, layout: ClientLayout },
    { path: "/prenium/:idUser", component: TrangChu, layout: ClientLayout },
    { path: "/user/:idUser", component: TrangChu, layout: ClientLayout },
];

// Public routes
const publicRoutes = [
    { path: "/", component: Login, layout: LoginLayout },
    { path: "/signup", component: Signup, layout: LoginLayout },
];

export { adminRoutes, clientRoutes, publicRoutes };
