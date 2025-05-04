import validation from "../../../utils/validation";
import { NotifyError, NotifyWarning, NotifySuccess } from "../../components/Toast";
import "./DangKy.css";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "../../../services/UserAPI";
import { createFavoriteAPI } from "../../../services/FavoriteAPI";

function DangKy() {
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const tenDangNhapE = document.getElementById('tendangnhap');
        const matKhauE = document.getElementById('matkhau');
        const xacNhanMatKhauE = document.getElementById('xacnhanmatkhau');

        if (validation(tenDangNhapE) && validation(matKhauE) && validation(xacNhanMatKhauE)) {
            const username = tenDangNhapE.value.trim();
            const password = matKhauE.value.trim();
            const confirmPassword = xacNhanMatKhauE.value.trim();

            if (password !== confirmPassword) {
                NotifyError("Mật khẩu xác nhận không khớp");
                return;
            }

            try {
                const cleanUsername = username.replace(/\s+/g, '');
                const userData = {
                    username,
                    password,
                    confirm_password: confirmPassword,
                    email: `${cleanUsername}@example.com`,
                    idquyen: 0 // Mặc định là user thường
                };

                const response = await registerAPI(userData);

                if (response.success) {
                    NotifySuccess("Đăng ký thành công");
                    const dataAddFavorite = await createFavoriteAPI(response.user.id);
                    navigate("/");
                } else {
                    NotifyError(response.message || "Đăng ký thất bại");
                }
            } catch (error) {
                const data = error.response?.data;
                let message = "Đăng ký thất bại. Vui lòng thử lại.";

                if (data) {
                    const firstKey = Object.keys(data)[0];
                    if (firstKey) {
                        const firstError = data[firstKey][0];
                        if (firstError) {
                            message = firstError;
                        }
                    }
                }
                NotifyError(message); 
            }
        } else {
            NotifyWarning('Vui lòng nhập thông tin đầy đủ');
        }
    };

    return (
        <div className="DangKy">
            <div className="DangKy_main">
                <h2>Đăng ký</h2>
                <form className="DangKy_form" onSubmit={handleRegister}>
                    <input id="tendangnhap" type="text" placeholder="Tên đăng nhập"/>
                    <input id="matkhau" type="password" placeholder="Mật khẩu"/>
                    <input id="xacnhanmatkhau" type="password" placeholder="Xác Nhận Mật khẩu"/>

                    <div className="DangKy_option">
                        <div className="DangKy_option-dangKy">
                            <span onClick={() => navigate("/")}>
                                Đăng nhập
                            </span>
                        </div>
                    </div>  

                    <button type="submit">Đăng ký</button>
                </form> 
            </div>
        </div>
    );
}

export default DangKy;