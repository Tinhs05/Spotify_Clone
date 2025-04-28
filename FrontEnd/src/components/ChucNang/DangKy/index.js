import validation from "../../../utils/validation";
import { NotifyError, NotifyWarning } from "../../components/Toast";
import "./DangKy.css";

import { useNavigate } from "react-router-dom";

function DangKy() {
    const navigate = useNavigate();

    return (
        <div className="DangKy">
            <div className="DangKy_main">
                <h2>Đăng ký</h2>
                <form className="DangKy_form" onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <input id="tendangnhap" type="text" placeholder="Tên đăng nhập"/>
                    <input id="matkhau" type="password" placeholder="Mật khẩu"/>
                    <input id="xacnhanmatkhau" type="password" placeholder="Xác Nhận Mật khẩu"/>

                    <div className="DangKy_option">
                        <div className="DangKy_option-dangKy">
                            <span
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                Đăng nhập
                            </span>
                        </div>
                    </div>  

                    <button type="submit">Đăng ký</button>
                </form> 
            </div>
        </div>
    )
}

export default DangKy