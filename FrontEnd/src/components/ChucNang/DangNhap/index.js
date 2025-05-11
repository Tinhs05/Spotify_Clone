import validation from "../../../utils/validation";
import { NotifyError, NotifyWarning } from "../../components/Toast";
import "./DangNhap.css";
import { loginAPI } from "../../../services/UserAPI";
import { useNavigate } from "react-router-dom";
import { useTrack } from "../../Layouts/contexts/TrackProvider";

function DangNhap() {
    const navigate = useNavigate();
    const { setUser } = useTrack();

    const login = async() => {
        const tenDangNhapE = document.getElementById('tendangnhap')
        const matKhauE = document.getElementById('matkhau')
        
        if(validation(tenDangNhapE) && validation(matKhauE)) {
            const username = tenDangNhapE.value.trim();
            const password = matKhauE.value.trim();
            
            try {
                const data = await loginAPI(username, password);
                if(data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('token', data.access);
                    setUser(data.user);
                    
                    // Chuyển hướng dựa vào role
                    if(data.user.role === 0) {
                        navigate("/home", { replace: true });
                    } else if(data.user.role === 1) {
                        navigate("/admin/dashboard", { replace: true });
                    } else {
                        navigate("/", { replace: true });
                    }
                }
            } catch (error) {
                console.error('Login error:', error);
                NotifyError(error.message || 'Đăng nhập thất bại');
                // Xóa thông tin đăng nhập cũ nếu có
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                // Chuyển về trang đăng nhập (trang chủ)
                navigate("/", { replace: true });
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
                            <span 
                                onClick={() => {
                                    navigate("/signup");
                                }}
                            >
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