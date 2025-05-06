import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Space, Select, Tag, InputNumber, Switch, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import adminService from '../../../services/adminService';
import { MESSAGES, FORM_RULES, TABLE_PAGINATION } from '../../../constants/admin';
import axios from 'axios';

const SongManagement = () => {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSong, setEditingSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const res = await adminService.getSongs();
      console.log('API Response:', res.data); // Debug log
      const songsData = res.data?.tracks || [];
      console.log('Songs data:', songsData); // Debug log
      console.log('First song genre:', songsData[0]?.genre); // Debug log
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
      console.log('Genres data:', genresData); // Debug log
      console.log('Number of genres:', genresData.length); // Debug log
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
      genre: song.genre?.id || song.genre // Lấy ID nếu là object, giữ nguyên nếu là ID
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

  const handleAudioUpload = (file) => {
    setAudioFile(file);
    getAudioDuration(file).then(duration => form.setFieldsValue({ duration }));
    return false;
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      // Upload file lên S3 nếu có
      let audioUrl = '';
      let imageUrl = '';
      let videoUrl = '';

      if (audioFile) {
        const formData = new FormData();
        formData.append('file', audioFile);
        formData.append('object_type', 'track');
        const res = await axios.post('http://localhost:8000/api/upload-to-s3/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        audioUrl = res.data.url;
      } else {
        audioUrl = values.audio_file_path || '';
      }

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('object_type', 'track');
        const res = await axios.post('http://localhost:8000/api/upload-to-s3/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageUrl = res.data.url;
      } else {
        imageUrl = values.image_file_path || '';
      }

      if (videoFile) {
        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('object_type', 'track');
        const res = await axios.post('http://localhost:8000/api/upload-to-s3/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        videoUrl = res.data.url;
      } else {
        videoUrl = values.video_file_path || '';
      }

      const songData = {
        title: values.title,
        duration: values.duration,
        artist: values.artist,
        genre: values.genre, // Đảm bảo là id
        audio_file_path: audioUrl,
        video_file_path: videoUrl,
        image_file_path: imageUrl,
        is_premium: values.is_premium ? 1 : 0
      };

      if (editingSong) {
        await adminService.updateSong(editingSong.id, songData);
        message.success(MESSAGES.SUCCESS.UPDATE_SONG);
      } else {
        await adminService.createSong(songData);
        message.success(MESSAGES.SUCCESS.CREATE_SONG);
      }
      setIsModalVisible(false);
      fetchSongs();
      setAudioFile(null);
      setImageFile(null);
      setVideoFile(null);
    } catch (error) {
      console.error('Error submitting song:', error);
      console.error('Error details:', error.response?.data);
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

  const handleImageUpload = (file) => {
    setImageFile(file);
    return false;
  };

  const handleVideoUpload = (file) => {
    setVideoFile(file);
    return false;
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
      render: (_, record) => {
        console.log('Rendering genre for record:', record); // Debug log
        return (
          <Tag color="blue">
            {record.genre?.name || 'Chưa phân loại'}
          </Tag>
        );
      }
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
            rules={[FORM_RULES.REQUIRED('thể loại')]}
          >
            <Select
              placeholder="Chọn thể loại"
              allowClear
              showSearch
              optionFilterProp="children"
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