import { useTrack } from "../../contexts/TrackProvider";
import "./HeaderClient.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SpotifyOutlined, HomeFilled, ShopFilled, ToolFilled, SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip, Input, Dropdown } from "antd";
import { useNavigate, Link } from "react-router-dom";

function HeaderClient() {
    const navigate = useNavigate();
    const { user } = useTrack();
    const [searchValue, setSearchValue] = useState('');

    // Nếu không có user, chuyển hướng về trang đăng nhập
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    // Nếu không có user, không render gì cả
    if (!user) {
        return null;
    }

    const items = [
        {
            label: (
                <a onClick={() => navigate(`/user/${user.id}`)}>
                    Hồ sơ
                </a>
            ),
            key: '0',
        },
        {
            label: (
                <a 
                    onClick={() => {
                        localStorage.removeItem('user');
                        window.location.href = "/"
                    }}
                >
                    Đăng xuất
                </a>
              ),
            key: '1',
        },
    ];

    const handleSearch = () => {
        if (searchValue.trim() !== '') {
            navigate(`/search/${encodeURIComponent(searchValue.trim())}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    function getIdUser()
    {
        const idUser = localStorage.getItem("idUser");
        return parseInt(idUser);
    }

    return (
        <div className="header-client">
            <div className="left-container">
                <div className="logo">
                    <SpotifyOutlined className="icon-spotify"/>
                </div>
                <div className="home">
                    <Tooltip placement="bottom" title={"Trang chủ"}>
                        <div className="icon-container">
                            <HomeFilled
                                onClick={() => {
                                    navigate("/home");
                                }}
                            />
                        </div>
                    </Tooltip>
                </div>

                <div className="search-input">
                    <Input
                        className="custom-placeholder"
                        placeholder="Tìm kiếm..."
                        value={searchValue}
                        onChange={(e) => 
                            setSearchValue(e.target.value)
                        }
                        onPressEnter={handleKeyPress}
                        prefix={<SearchOutlined 
                                    onClick={handleSearch}
                                    style={{
                                        fontSize: '20px',
                                        marginRight: '5px'
                                    }}
                               />}
                        addonAfter={
                            <Tooltip placement="bottom" title={"Duyệt tìm"}>
                                <ShopFilled />
                            </Tooltip>
                        }
                    />
                </div>

            </div>
            <div className="right-container">
                <div className="feature-btn">
                    <button onClick={() => navigate(`/prenium/${user.id}`)}>Khám phá Premium</button>
                </div>
                <Dropdown menu={{ items }} trigger={['click']}>
                    <Tooltip className="user-wrapper" placement="bottom" title={user.username}>
                        <span>{user.username.charAt(0).toUpperCase()}</span>
                    </Tooltip>
                </Dropdown>
            </div>
        </div>
    )
}

export default HeaderClient;