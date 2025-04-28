// Page
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import QL_AudioMusic from "../pages/QL_AudioMusic";
import TrangChu from "../pages/TrangChu";

// Layout
import LoginLayout from "../components/Layouts/LoginLayout";
import ClientLayout from "../components/Layouts/ClientLayout";
import AdminLayout from "../components/Layouts/AdminLayout";

const quanLyRoutes = [
  // { path: '/quanly/taikhoan', component: QL_TaiKhoan, },
  // { path: '/quanly/sanpham', component: QL_SanPham, },
];

// Public routes
const publicRoutes = [
  { path: "/", component: TrangChu, layout: ClientLayout },
  { path: "/playlist/:idPlaylist", component: TrangChu, layout: ClientLayout },
  { path: "/favorite/:idUser", component: TrangChu, layout: ClientLayout },
  { path: "/track/:idTrack", component: TrangChu, layout: ClientLayout },
  { path: "/genre/:idGenre", component: TrangChu, layout: ClientLayout },
  { path: "/search/:nameTrack", component: TrangChu, layout: ClientLayout },
  { path: "/video", component: TrangChu, layout: ClientLayout },
  { path: "/prenium/:idUser", component: TrangChu, layout: ClientLayout },
  { path: "/admin/audio-music", component: QL_AudioMusic, layout: AdminLayout },
  { path: "/signin", component: Login, layout: LoginLayout },
  { path: "/signup", component: Signup, layout: LoginLayout },
];

export { quanLyRoutes, publicRoutes };
