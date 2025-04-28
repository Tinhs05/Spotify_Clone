import "./Footer.css";
import { Row, Col } from "antd";
import { InstagramOutlined, TwitterOutlined, FacebookOutlined } from "@ant-design/icons";

function Footer() {
  return (
    <footer className="footer">
      <Row className="wrap-main">
        <Col span={6}>
          <h2 className="heading">
            Công ty
          </h2>
          <ul>
            <li><b>Giới thiệu</b></li> 
            <li><b>Việc làm</b></li>
            <li><b>For the record</b></li>
          </ul>
        </Col>
        <Col span={6} className="flex">
          <h2 className="heading">
            Cộng đồng
          </h2>
          <ul>
            <li><b>Dành cho các nghệ sĩ</b></li> 
            <li><b>Nhà phát triển</b></li>
            <li><b>Quảng cáo</b></li>
            <li><b>Nhà đầu tư</b></li>
            <li><b>Nhà cung cấp</b></li>
          </ul>
        </Col>
        <Col span={6} className="flex">
          <h2 className="heading">
            Liên kết hữu ích
          </h2>
          <ul>
            <li><b>Hỗ trợ</b></li> 
            <li><b>Ứng dụng di động miễn phí</b></li>
          </ul>
        </Col>
        <Col span={6} className="flex">
          <h2 className="heading">
            Các gói của Spotify
          </h2>
          <ul>
            <li><b>Premium Individual</b></li> 
            <li><b>Premium Student</b></li>
            <li><b>Spotify Free</b></li>
          </ul>
        </Col>


      </Row>
      <Row >
        <Col span={24}>
          <div className="bottom">
            <p className="copyright">
              © 2025 Spotify AB
            </p>
            <div className="social-list">
              <InstagramOutlined />
              <TwitterOutlined />
              <FacebookOutlined />
            </div>
          </div>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
