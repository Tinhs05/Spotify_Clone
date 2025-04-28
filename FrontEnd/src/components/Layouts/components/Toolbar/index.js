import { useEffect, useState } from "react";
import "./Toolbar.css";
import { useNavigate } from "react-router-dom";
import { LoginOutlined, UserOutlined } from '@ant-design/icons';

function Toolbar() {
  const [dsChucNang, setDsChucNang] = useState("");
  const [tenNguoiDung, setTenNguoiDung] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const nguoidung = JSON.parse(sessionStorage.getItem("nguoidung"));
  //   setTenNguoiDung(nguoidung.tennguoidung);
  //   if (nguoidung.idquyen === 0) {
  //     setDsChucNang(
  //       <>
  //         <li
  //           onClick={() => {
  //             navigate("/nhanvien/nhandon");
  //           }}
  //         >
  //           Nhận đơn
  //         </li>
  //         <li
  //           onClick={() => {
  //             navigate("/nhanvien/tradon");
  //           }}
  //         >
  //           Trả đơn
  //         </li>
  //         <li
  //           onClick={() => {
  //             navigate("/nhanvien/xuathoadon");
  //           }}
  //         >
  //           Xuất hóa đơn
  //         </li>
  //         <li
  //           onClick={() => {
  //             navigate("/nhanvien/ban");
  //           }}
  //         >
  //           Bàn
  //         </li>
  //         <li
  //           onClick={() => {
  //             navigate("/nhanvien/quanlydatban");
  //           }}
  //         >
  //           Quản lý đặt bàn
  //         </li>
  //       </>
  //     );
  //   } 
  // }, [navigate]);

  return (
    <nav className="toolbar">
      <div className="header">
        <div className="user-panel">
          <div className="role">
            <img src={`${process.env.PUBLIC_URL}/AdminLogo.png`} alt="Logo" />
            <span style={{fontSize: '20px', fontWeight: '300'}}>Admin</span>
          </div>
          <div className="user">
            <UserOutlined style={{ fontSize: '35px', margin: '0 10px' }}/>
            <span>tkhuo</span>
          </div>
        </div>
        <div className="subnav">
          <ul>
            <li
              onClick={(event) => {
                navigate('/')
                setTimeout(() => {
                  sessionStorage.removeItem("nguoidung");
                  window.location.reload();
                }, 100)
              }}
            >
              <LoginOutlined style={{ marginRight: '10px', fontSize: '20px' }}></LoginOutlined>
              Đăng xuất
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Toolbar;
