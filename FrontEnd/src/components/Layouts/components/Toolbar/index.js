import { useTrack } from "../../contexts/TrackProvider";
import { useEffect, useState } from "react";
import "./Toolbar.css";
import { useNavigate } from "react-router-dom";
import { LoginOutlined, UserOutlined } from '@ant-design/icons';

function Toolbar() {
  const [dsChucNang, setDsChucNang] = useState("");
  const [tenNguoiDung, setTenNguoiDung] = useState("");
  const { user } = useTrack();
  const navigate = useNavigate();


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
            <span>{user.username}</span>
          </div>
        </div>
        <div className="subnav">
          <ul>
          <li
              onClick={(event) => {
                navigate('/admin/audio-music')
              }}
            >
              <LoginOutlined style={{ marginRight: '10px', fontSize: '20px' }}></LoginOutlined>
              Quản lý bài hát
            </li>
            <li
              onClick={(event) => {
                navigate('/')
                setTimeout(() => {
                  localStorage.removeItem("user");
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
