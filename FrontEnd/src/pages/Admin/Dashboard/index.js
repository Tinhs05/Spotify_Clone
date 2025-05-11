import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Spin } from 'antd';
import adminService from '../../../services/adminService';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total_users: 0,
    total_songs: 0,
    premium_users: 0
  });
  const [users, setUsers] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Lấy danh sách người dùng
        const usersRes = await adminService.getUsers();
        const usersData = usersRes.data || [];
        setUsers(Array.isArray(usersData) ? usersData : []);
        
        // Lấy danh sách bài hát
        const songsRes = await adminService.getSongs();
        const songsData = songsRes.data || [];
        setSongs(Array.isArray(songsData) ? songsData : []);

        // Tính toán thống kê
        const premiumUsers = usersData.filter(user => user.is_premium).length;
        
        setStats({
          total_users: usersData.length,
          total_songs: songsData.length,
          premium_users: premiumUsers
        });

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Set empty arrays in case of error
        setUsers([]);
        setSongs([]);
        setStats({
          total_users: 0,
          total_songs: 0,
          premium_users: 0
        });
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const userColumns = [
    { title: 'Tên đăng nhập', dataIndex: 'username' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Premium', dataIndex: 'is_premium', render: (isPremium) => isPremium ? 'Có' : 'Không' }
  ];

  const songColumns = [
    { title: 'Tên bài hát', dataIndex: 'title' },
    { title: 'Nghệ sĩ', dataIndex: 'artist' },
    { title: 'Album', dataIndex: 'album' }
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Tổng số người dùng" value={stats.total_users} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Tổng số bài hát" value={stats.total_songs} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Người dùng premium" value={stats.premium_users} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="Người dùng mới nhất">
            <Table 
              dataSource={users.slice(0, 5)} 
              columns={userColumns} 
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Bài hát mới nhất">
            <Table 
              dataSource={songs.slice(0, 5)} 
              columns={songColumns} 
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;