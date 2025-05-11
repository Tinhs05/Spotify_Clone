import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Space, Select, Tag, Switch } from 'antd';
import adminService from '../../../services/adminService';
import { MESSAGES, FORM_RULES, TABLE_PAGINATION, USER_ROLES, USER_ROLE_LABELS } from '../../../constants/admin';
import { createFavoriteAPI } from '../../../services/FavoriteAPI';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminService.getUsers();
      console.log('Users API Response:', res.data); // Debug log
      const usersData = res.data || [];
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error(MESSAGES.ERROR.FETCH_USERS);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchUsers(); 
  }, []);

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue({
      ...user,
      password: '', // Không hiển thị mật khẩu cũ
      confirmPassword: '' // Không hiển thị mật khẩu xác nhận
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: MESSAGES.CONFIRM.DELETE_USER.TITLE,
      content: MESSAGES.CONFIRM.DELETE_USER.CONTENT,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          setLoading(true);
          await adminService.deleteUser(id);
          message.success(MESSAGES.SUCCESS.DELETE_USER);
          fetchUsers();
        } catch (error) {
          console.error('Error deleting user:', error);
          message.error(MESSAGES.ERROR.DELETE_USER + (error.response?.data?.error || error.message));
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const userData = {
        username: values.username,
        email: values.email,
        role: values.role,
        is_premium: values.is_premium || false,
        profile_image_path: null
      };

      if (editingUser) {
        // Khi sửa, chỉ gửi password nếu có thay đổi
        if (values.password) {
          userData.password = values.password;
        }
        await adminService.updateUser(editingUser.id, userData);
        message.success(MESSAGES.SUCCESS.UPDATE_USER);
      } else {
        // Khi tạo mới, thêm password và confirm_password
        userData.password = values.password;
        userData.confirm_password = values.confirmPassword;
        const response = await adminService.createUser(userData);
        console.log(">>> id: ", response)
        if (response.data.success) {
          // Create favorite playlist for new user
          
          await createFavoriteAPI(response.data.user.id);
          message.success(MESSAGES.SUCCESS.CREATE_USER);
        }
      }
      setIsModalVisible(false);
      fetchUsers();
    } catch (error) {
      console.error('Error submitting user:', error);
      message.error(MESSAGES.ERROR.GENERAL + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handlePremiumToggle = async (id, currentStatus) => {
    try {
      setLoading(true);
      await adminService.updatePremiumStatus(id, !currentStatus);
      message.success(MESSAGES.SUCCESS.UPDATE_PREMIUM);
      fetchUsers();
    } catch (error) {
      console.error('Error updating premium status:', error);
      message.error(MESSAGES.ERROR.UPDATE_PREMIUM + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { 
      title: 'Tên đăng nhập', 
      dataIndex: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username)
    },
    { 
      title: 'Email', 
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email)
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      render: (role) => (
        <Tag color={role === USER_ROLES.ADMIN ? 'red' : 'blue'}>
          {USER_ROLE_LABELS[role]}
        </Tag>
      ),
      filters: [
        { text: USER_ROLE_LABELS[USER_ROLES.ADMIN], value: USER_ROLES.ADMIN },
        { text: USER_ROLE_LABELS[USER_ROLES.USER], value: USER_ROLES.USER }
      ],
      onFilter: (value, record) => record.role === value
    },
    {
      title: 'Premium',
      dataIndex: 'is_premium',
      render: (isPremium, record) => (
        <Space>
          <Switch 
            checked={isPremium} 
            onChange={() => handlePremiumToggle(record.id, isPremium)}
            loading={loading}
            checkedChildren="Có"
            unCheckedChildren="Không"
          />
          <Tag color={isPremium ? 'green' : 'default'}>
            {isPremium ? 'Premium' : 'Thường'}
          </Tag>
        </Space>
      ),
      filters: [
        { text: 'Premium', value: true },
        { text: 'Thường', value: false }
      ],
      onFilter: (value, record) => record.is_premium === value
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
    <div className="user-management">
      <div className="header" style={{ marginBottom: 16 }}>
        <Button 
          type="primary" 
          onClick={handleAdd}
          loading={loading}
        >
          Thêm người dùng mới
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: TABLE_PAGINATION.PAGE_SIZE,
          showSizeChanger: TABLE_PAGINATION.SHOW_SIZE_CHANGER,
          showTotal: (total) => `Tổng số ${total} người dùng`
        }}
      />

      <Modal
        title={editingUser ? "Sửa người dùng" : "Thêm người dùng mới"}
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
            name="username"
            label="Tên đăng nhập"
            rules={[FORM_RULES.REQUIRED('tên đăng nhập')]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              FORM_RULES.REQUIRED('email'),
              FORM_RULES.EMAIL
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              ...(editingUser ? [] : [FORM_RULES.REQUIRED('mật khẩu')]),
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            dependencies={['password']}
            rules={[
              ...(editingUser ? [] : [FORM_RULES.REQUIRED('xác nhận mật khẩu')]),
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="role"
            label="Vai trò"
            rules={[FORM_RULES.REQUIRED('vai trò')]}
          >
            <Select>
              <Select.Option value={USER_ROLES.ADMIN}>{USER_ROLE_LABELS[USER_ROLES.ADMIN]}</Select.Option>
              <Select.Option value={USER_ROLES.USER}>{USER_ROLE_LABELS[USER_ROLES.USER]}</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="is_premium"
            label="Premium"
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
                {editingUser ? 'Cập nhật' : 'Thêm mới'}
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

export default UserManagement; 