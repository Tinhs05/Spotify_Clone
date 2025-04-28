import validation from "../../../utils/validation";
import { NotifyError, NotifyWarning } from "../../components/Toast";
import "./DangNhap.css";
import { loginAPI } from "../../../services/UserAPI";
import { useNavigate } from "react-router-dom";

function DangNhap() {
    const navigate = useNavigate();

    const login = async() => {
        const tenDangNhapE = document.getElementById('tendangnhap')
        const matKhauE = document.getElementById('matkhau')
        
        if(validation(tenDangNhapE) && validation(matKhauE)) {
            try {
                const username = tenDangNhapE.value.trim();
                const password = matKhauE.value.trim();
                const response = await loginAPI(username, password);

                if(response.token) {
                    // Lưu token vào localStorage
                    localStorage.setItem('token', response.token);
                    // Lưu thông tin user vào sessionStorage
                    sessionStorage.setItem('nguoidung', JSON.stringify(response.user));
                    
                    // Điều hướng dựa vào role
                    if(response.user.idquyen === 0) {
                        window.location.href = "/nhanvien/nhandon";
                    } else if(response.user.idquyen === 1) {
                        window.location.href = "/quanly/donhang";
                    } else if(response.user.idquyen === 2) {
                        window.location.href = "/bep/nhandon";
                    } else {
                        window.location.href = "/";
                    }
                } else {
                    NotifyError(response.message || "Đăng nhập thất bại");
                }
            } catch (error) {
                NotifyError(error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.");
            }
        } else {
            NotifyWarning('Vui lòng nhập thông tin đầy đủ');
        }
    }

    return (
        <div className="DangNhap">
            <div className="DangNhap_main">
                <h2>Đăng nhập</h2>
                <form className="DangNhap_form" onSubmit={(e) => {
                    e.preventDefault();
                    login();
                }}>
                    <input id="tendangnhap" type="text" placeholder="Tên đăng nhập"/>
                    <input id="matkhau" type="password" placeholder="Mật khẩu"/>

                    <div className="DangNhap_option">
                        <div className="DangNhap_option-quenMatKhau">
                            <span onClick={() => navigate("/signup")}>
                                Đăng Ký
                            </span>
                        </div>
                    </div>  

                    <button type="submit">Đăng nhập</button>
                </form> 
            </div>
        </div>
    )
}

export default DangNhap;