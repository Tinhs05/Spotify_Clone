import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Space, Switch, Tag } from 'antd';
import adminService from '../../../services/adminService';
import { MESSAGES, FORM_RULES, TABLE_PAGINATION } from '../../../constants/admin';

const PlaylistManagement = () => {
  const [playlists, setPlaylists] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const res = await adminService.getPlaylists();
      console.log('Playlists API Response:', res.data); // Debug log
      const playlistsData = res.data || [];
      setPlaylists(Array.isArray(playlistsData) ? playlistsData : []);
    } catch (error) {
      console.error('Error fetching playlists:', error);
      message.error(MESSAGES.ERROR.FETCH_PLAYLISTS);
      setPlaylists([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchPlaylists(); 
  }, []);

  const handleAdd = () => {
    setEditingPlaylist(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (playlist) => {
    setEditingPlaylist(playlist);
    form.setFieldsValue(playlist);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: MESSAGES.CONFIRM.DELETE_PLAYLIST.TITLE,
      content: MESSAGES.CONFIRM.DELETE_PLAYLIST.CONTENT,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          setLoading(true);
          await adminService.deletePlaylist(id);
          message.success(MESSAGES.SUCCESS.DELETE_PLAYLIST);
          fetchPlaylists();
        } catch (error) {
          console.error('Error deleting playlist:', error);
          message.error(MESSAGES.ERROR.DELETE_PLAYLIST + (error.response?.data?.error || error.message));
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (editingPlaylist) {
        await adminService.updatePlaylist(editingPlaylist.id, values);
        message.success(MESSAGES.SUCCESS.UPDATE_PLAYLIST);
      } else {
        await adminService.createPlaylist(values);
        message.success(MESSAGES.SUCCESS.CREATE_PLAYLIST);
      }
      setIsModalVisible(false);
      fetchPlaylists();
    } catch (error) {
      console.error('Error submitting playlist:', error);
      message.error(MESSAGES.ERROR.GENERAL + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendToggle = async (id, currentStatus) => {
    try {
      setLoading(true);
      await adminService.updatePlaylist(id, { is_recommended: !currentStatus });
      message.success(currentStatus ? 'Đã tắt gợi ý playlist' : 'Đã bật gợi ý playlist');
      fetchPlaylists();
    } catch (error) {
      console.error('Error updating recommendation status:', error);
      message.error('Lỗi khi cập nhật trạng thái gợi ý');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { 
      title: 'Tên playlist', 
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    { 
      title: 'Mô tả', 
      dataIndex: 'description',
      ellipsis: true
    },
    {
      title: 'Gợi ý',
      dataIndex: 'is_recommended',
      render: (isRecommended, record) => (
        <Space>
          <Switch 
            checked={isRecommended} 
            onChange={() => handleRecommendToggle(record.id, isRecommended)}
            loading={loading}
            checkedChildren="Có"
            unCheckedChildren="Không"
          />
          <Tag color={isRecommended ? 'green' : 'default'}>
            {isRecommended ? 'Đang gợi ý' : 'Không gợi ý'}
          </Tag>
        </Space>
      ),
      filters: [
        { text: 'Đang gợi ý', value: true },
        { text: 'Không gợi ý', value: false }
      ],
      onFilter: (value, record) => record.is_recommended === value
    },
    {
      title: 'Hành động',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary"
            onClick={() => handleEdit(record)}
            loading={loading}
          >
            Sửa
          </Button>
          <Button 
            danger 
            onClick={() => handleDelete(record.id)}
            loading={loading}
          >
            Xóa
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div className="playlist-management">
      <div className="header" style={{ marginBottom: 16 }}>
        <Button 
          type="primary" 
          onClick={handleAdd}
          loading={loading}
        >
          Thêm playlist mới
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={playlists}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: TABLE_PAGINATION.PAGE_SIZE,
          showSizeChanger: TABLE_PAGINATION.SHOW_SIZE_CHANGER,
          showTotal: (total) => `Tổng số ${total} playlist`
        }}
      />

      <Modal
        title={editingPlaylist ? "Sửa playlist" : "Thêm playlist mới"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Tên playlist"
            rules={[FORM_RULES.REQUIRED('tên playlist')]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="is_recommended"
            label="Gợi ý cho người nghe"
            valuePropName="checked"
          >
            <Switch 
              checkedChildren="Có"
              unCheckedChildren="Không"
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                {editingPlaylist ? 'Cập nhật' : 'Thêm mới'}
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PlaylistManagement; 