import "./HeaderClient.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SpotifyOutlined, HomeFilled, ShopFilled, ToolFilled, SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip, Input, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";

const items = [
    {
      label: (
        <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
          1st menu item
        </a>
      ),
      key: '0',
    },
    {
      label: (
        <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
          2nd menu item
        </a>
      ),
      key: '1',
    },
    {
      label: '3rd menu item',
      key: '2',
    },
];


function HeaderClient() {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

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
                                    navigate("/");
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
                    <button onClick={() => navigate(`/prenium/${1}`)}>Khám phá Premium</button>
                </div>
                <Dropdown menu={{ items }} trigger={['click']}>
                    <Tooltip className="user-wrapper" placement="bottom" title={"Khuong Tran"}>
                        <span>K</span>
                    </Tooltip>
                </Dropdown>
            </div>
        </div>
    )
}

export default HeaderClient;