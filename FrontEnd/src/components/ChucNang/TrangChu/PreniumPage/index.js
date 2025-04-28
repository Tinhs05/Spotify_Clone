import { useTrack } from "../../../Layouts/contexts/TrackProvider";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';
import { Card, Button, Typography, Space, Divider, Modal, Radio } from "antd";
import "./PreniumPage.css";


function PreniumPage(props) {
    const { Title, Text } = Typography
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState("1");
    const { idUser } = useParams();

    // Mock Data
    const users = [
        {
            id: 1,
            username: 'Trần Văn A',
            image_file_path: null,
            email: 'tranvana@gmail.com',
            password: '123456',
            profile_image_path: null,
            isPrenium: 0
        },
        {
            id: 2,
            username: 'Trần Văn B',
            image_file_path: null,
            email: 'tranvanb@gmail.com',
            password: '123456',
            profile_image_path: null,
            isPrenium: 0
        },
        {
            id: 3,
            username: 'Trần Văn C',
            image_file_path: null,
            email: 'tranvanc@gmail.com',
            password: '123456',
            profile_image_path: null,
            isPrenium: 0
        },
    ]


    const getUserById = () => {
        return users.find(item => item.id === parseInt(idUser));
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handlePlanChange = (e) => {
        setSelectedPlan(e.target.value)
    }
        

    

    return (
        <>
            <div
                className="premium-card-container"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    background: "#1a1a1a",
                }}
            >
                <Card
                    style={{
                        width: 400,
                        background: "linear-gradient(135deg, #654008 0%, #8B6B1B 100%)",
                        borderRadius: 16,
                        border: "none",
                        padding: 24,
                    }}
                    bodyStyle={{ padding: 0 }}
                >
                    <div style={{ padding: "20px 24px" }}>
                        <div style={{ marginBottom: 16 }}>
                            <Space align="center">
                                <Title level={2} style={{ margin: 0, color: "white" }}>
                                    Spotify
                                </Title>
                                <div
                                    style={{
                                    background: "white",
                                    padding: "2px 12px",
                                    borderRadius: 4,
                                    marginLeft: 8,
                                    }}
                                >
                                    <Text strong style={{ color: "#654008", fontSize: 16 }}>
                                    PREMIUM
                                    </Text>
                                </div>
                            </Space>
                        </div>

                        <Text style={{ color: "white", fontSize: 16, display: "block", marginBottom: 24 }}>
                            Toàn bộ đặc quyền Plus cùng kho nhạc Premium
                        </Text>

                        <Title level={2} style={{ color: "white", marginTop: 0, marginBottom: 32 }}>
                            Chỉ từ 41.000đ/tháng
                        </Title>

                        <Button
                            type="primary"
                            size="large"
                            block
                            onClick={showModal}
                            style={{
                                height: 56,
                                fontSize: 18,
                                fontWeight: "bold",
                                background: "#F2B93B",
                                borderColor: "#F2B93B",
                                marginBottom: 32,
                            }}
                        >
                            ĐĂNG KÝ GÓI
                        </Button>

                        <Divider style={{ borderColor: "rgba(255, 255, 255, 0.2)", margin: "24px 0" }} />

                        <div style={{ marginTop: 24 }}>
                            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", display: "block", marginBottom: 16 }}>
                                Đặc quyền đặc biệt:
                            </Text>

                            <Space direction="vertical" size={16}>
                            <Space>
                                <CheckOutlined style={{ color: "#F2B93B", fontSize: 18 }} />
                                <Text style={{ color: "white", fontSize: 16 }}>Kho nhạc Premium</Text>
                            </Space>

                            <Space>
                                <CheckOutlined style={{ color: "#F2B93B", fontSize: 18 }} />
                                <Text style={{ color: "white", fontSize: 16 }}>Nghe nhạc không quảng cáo</Text>
                            </Space>
                            </Space>
                        </div>
                    </div>
                </Card>

                <Modal
                    title={<Text style={{ fontSize: 24, fontWeight: "bold" }}>Chọn gói nâng cấp</Text>}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Hủy
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            onClick={handleOk}
                            style={{ background: "#F2B93B", borderColor: "#F2B93B" }}
                        >
                            Thanh toán
                        </Button>,
                    ]}
                    width={500}
                    style={{ top: 20 }}
                    bodyStyle={{ padding: "24px 0" }}
                >
                    <Radio.Group onChange={handlePlanChange} value={selectedPlan} style={{ width: "100%" }}>
                        <div
                            style={{
                                border: selectedPlan === "3" ? "2px solid #F2B93B" : "1px solid #333",
                                borderRadius: 12,
                                padding: 24,
                                marginBottom: 16,
                                background: selectedPlan === "3" ? "#654008" : "#1F1F2B",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#F2B93B" }}>12 tháng</Text>
                                    <div style={{ marginTop: 8 }}>
                                        <Text style={{ fontSize: 28, fontWeight: "bold", color: "white", marginRight: 12 }}>499.000đ</Text>
                                        <Text style={{ fontSize: 16, color: "#999", textDecoration: "line-through" }}>588.000đ</Text>
                                        <span
                                            style={{
                                            background: "#654008",
                                            color: "#F2B93B",
                                            padding: "2px 8px",
                                            borderRadius: 4,
                                            fontSize: 14,
                                            marginLeft: 12,
                                            }}
                                        >
                                            Tiết kiệm 15%
                                        </span>
                                    </div>
                                    <Text style={{ fontSize: 16, color: "#999" }}>Chỉ 41.000đ/tháng</Text>
                                </div>
                                <Radio value="3" />
                            </div>
                        </div>

                        <div
                            style={{
                                border: selectedPlan === "2" ? "2px solid #F2B93B" : "1px solid #333",
                                borderRadius: 12,
                                padding: 24,
                                marginBottom: 16,
                                background: selectedPlan === "2" ? "#654008" : "#1F1F2B",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#F2B93B" }}>6 tháng</Text>
                                    <div style={{ marginTop: 8 }}>
                                        <Text style={{ fontSize: 28, fontWeight: "bold", color: "white", marginRight: 12 }}>279.000đ</Text>
                                        <Text style={{ fontSize: 16, color: "#999", textDecoration: "line-through" }}>294.000đ</Text>
                                        <span
                                            style={{
                                            background: "#654008",
                                            color: "#F2B93B",
                                            padding: "2px 8px",
                                            borderRadius: 4,
                                            fontSize: 14,
                                            marginLeft: 12,
                                            }}
                                        >
                                            Tiết kiệm 5%
                                        </span>
                                    </div>
                                    <Text style={{ fontSize: 16, color: "#999" }}>Chỉ 46.000đ/tháng</Text>
                                </div>
                                <Radio value="2" />
                            </div>
                        </div>

                        <div
                            style={{
                                border: selectedPlan === "1" ? "2px solid #F2B93B" : "1px solid #333",
                                borderRadius: 12,
                                padding: 24,
                                background: selectedPlan === "1" ? "#654008" : "#1F1F2B",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#F2B93B" }}>1 tháng</Text>
                                    <div style={{ marginTop: 8 }}>
                                    <Text style={{ fontSize: 28, fontWeight: "bold", color: "white" }}>49.000đ</Text>
                                    </div>
                                </div>
                                <Radio value="1" />
                            </div>
                        </div>
                    </Radio.Group>
                </Modal>
            </div>
        </>
    )
}

export default PreniumPage;