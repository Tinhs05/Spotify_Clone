import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Space, Select, Tag, InputNumber, Switch, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import adminService from '../../../services/adminService';
import { MESSAGES, FORM_RULES, TABLE_PAGINATION } from '../../../constants/admin';

const SongManagement = () => {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSong, setEditingSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const res = await adminService.getSongs();
      console.log('API Response:', res.data); // Debug log
      const songsData = res.data?.tracks || [];
      setSongs(Array.isArray(songsData) ? songsData : []);
    } catch (error) {
      console.error('Error fetching songs:', error);
      message.error(MESSAGES.ERROR.FETCH_SONGS);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await adminService.getGenres();
      console.log('Genres Response:', res.data); // Debug log
      const genresData = res.data?.genres || [];
      setGenres(Array.isArray(genresData) ? genresData : []);
    } catch (error) {
      console.error('Error fetching genres:', error);
      message.error('Lấy danh sách thể loại thất bại!');
    }
  };

  useEffect(() => { 
    fetchSongs();
    fetchGenres();
  }, []);

  const handleAdd = () => {
    setEditingSong(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (song) => {
    setEditingSong(song);
    form.setFieldsValue({
      ...song,
      genre: song.genre?.id
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: MESSAGES.CONFIRM.DELETE_SONG.TITLE,
      content: MESSAGES.CONFIRM.DELETE_SONG.CONTENT,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          setLoading(true);
          await adminService.deleteSong(id);
          message.success(MESSAGES.SUCCESS.DELETE_SONG);
          fetchSongs();
        } catch (error) {
          console.error('Error deleting song:', error);
          message.error(MESSAGES.ERROR.DELETE_SONG + (error.response?.data?.error || error.message));
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const songData = {
        title: values.title,
        duration: values.duration,
        artist: values.artist,
        genre_id: values.genre,
        audio_file_path: values.audio_file_path,
        video_file_path: values.video_file_path,
        image_file_path: values.image_file_path,
        is_premium: values.is_premium ? 1 : 0
      };

      console.log('Submitting song data:', songData); // Debug log

      if (editingSong) {
        await adminService.updateSong(editingSong.id, songData);
        message.success(MESSAGES.SUCCESS.UPDATE_SONG);
      } else {
        await adminService.createSong(songData);
        message.success(MESSAGES.SUCCESS.CREATE_SONG);
      }
      setIsModalVisible(false);
      fetchSongs();
    } catch (error) {
      console.error('Error submitting song:', error);
      console.error('Error details:', error.response?.data); // Debug log
      message.error(MESSAGES.ERROR.GENERAL + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getAudioDuration = (file) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.addEventListener('loadedmetadata', () => {
        resolve(Math.round(audio.duration));
      });
      audio.addEventListener('error', reject);
      audio.src = URL.createObjectURL(file);
    });
  };

  const handleAudioUpload = async (file) => {
    try {
      // Kiểm tra định dạng file
      if (!file.type.includes('audio/')) {
        message.error('Vui lòng chọn file audio!');
        return false;
      }

      // Lấy độ dài bài hát và lưu vào form (ẩn)
      const duration = await getAudioDuration(file);
      form.setFieldsValue({ duration });

      // Tạo đường dẫn file
      const filePath = `/media/audio/${file.name}`;
      form.setFieldsValue({ audio_file_path: filePath });

      return false; // Không tự động upload
    } catch (error) {
      console.error('Error getting audio duration:', error);
      message.error('Không thể đọc file audio!');
      return false;
    }
  };

  const handleImageUpload = (file) => {
    // Kiểm tra định dạng file
    if (!file.type.includes('image/')) {
      message.error('Vui lòng chọn file ảnh!');
      return false;
    }

    // Tạo đường dẫn file
    const filePath = `/media/images/${file.name}`;
    form.setFieldsValue({ image_file_path: filePath });

    return false; // Không tự động upload
  };

  const handleVideoUpload = (file) => {
    // Kiểm tra định dạng file
    if (!file.type.includes('video/')) {
      message.error('Vui lòng chọn file video!');
      return false;
    }

    // Tạo đường dẫn file
    const filePath = `/media/videos/${file.name}`;
    form.setFieldsValue({ video_file_path: filePath });

    return false; // Không tự động upload
  };

  const columns = [
    { 
      title: 'Tên bài hát', 
      dataIndex: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title)
    },
    { 
      title: 'Nghệ sĩ', 
      dataIndex: 'artist',
      sorter: (a, b) => a.artist.localeCompare(b.artist)
    },
    {
      title: 'Thể loại',
      dataIndex: ['genre', 'name'],
      render: (_, record) => (
        <Tag color="blue">
          {record.genre?.name || 'Chưa phân loại'}
        </Tag>
      )
    },
    {
      title: 'Thời lượng',
      dataIndex: 'duration',
      render: (duration) => formatDuration(duration)
    },
    {
      title: 'Premium',
      dataIndex: 'is_premium',
      render: (isPremium) => (
        <Tag color={isPremium === 1 ? 'green' : 'default'}>
          {isPremium === 1 ? 'Premium' : 'Thường'}
        </Tag>
      ),
      filters: [
        { text: 'Premium', value: 1 },
        { text: 'Thường', value: 0 }
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
    <div className="song-management">
      <div className="header" style={{ marginBottom: 16 }}>
        <Button 
          type="primary" 
          onClick={handleAdd}
          loading={loading}
        >
          Thêm bài hát mới
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={songs}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: TABLE_PAGINATION.PAGE_SIZE,
          showSizeChanger: TABLE_PAGINATION.SHOW_SIZE_CHANGER,
          showTotal: (total) => `Tổng số ${total} bài hát`
        }}
      />

      <Modal
        title={editingSong ? "Sửa bài hát" : "Thêm bài hát mới"}
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
            name="title"
            label="Tên bài hát"
            rules={[FORM_RULES.REQUIRED('tên bài hát')]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="artist"
            label="Nghệ sĩ"
            rules={[FORM_RULES.REQUIRED('nghệ sĩ')]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="genre"
            label="Thể loại"
          >
            <Select
              placeholder="Chọn thể loại"
              allowClear
            >
              {genres.map(genre => (
                <Select.Option key={genre.id} value={genre.id}>
                  {genre.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Ẩn trường duration nhưng vẫn giữ trong form */}
          <Form.Item name="duration" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            name="audio_file_path"
            label="File audio"
            rules={[FORM_RULES.REQUIRED('file audio')]}
          >
            <Upload
              beforeUpload={handleAudioUpload}
              maxCount={1}
              accept="audio/*"
            >
              <Button icon={<UploadOutlined />}>Chọn file audio</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="video_file_path"
            label="File video"
          >
            <Upload
              beforeUpload={handleVideoUpload}
              maxCount={1}
              accept="video/*"
            >
              <Button icon={<UploadOutlined />}>Chọn file video</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="image_file_path"
            label="Ảnh bìa"
          >
            <Upload
              beforeUpload={handleImageUpload}
              maxCount={1}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh bìa</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="is_premium"
            label="Premium"
            valuePropName="checked"
          >
            <Switch 
              checkedChildren="Premium"
              unCheckedChildren="Thường"
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                {editingSong ? 'Cập nhật' : 'Thêm mới'}
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

export default SongManagement; 