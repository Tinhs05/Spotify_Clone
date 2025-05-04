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
            const username = tenDangNhapE.value.trim();
            const password = matKhauE.value.trim();
            const data = await loginAPI(username, password);
            if(data.user) {
                localStorage.setItem('user', JSON.stringify(data.user))
                if(data.user.role === 0) {
                    window.location.href = "/home"
                } else if(data.user.role === 1) {
                    window.location.href = "/admin/dashboard"
                } else {
                    window.location.href = "/"
                }
            } else {
                NotifyError(data.error)
            }
            
        } else {
            NotifyWarning('Vui lòng nhập thông tin đầy đủ')
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