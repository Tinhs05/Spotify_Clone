import { useState, useEffect } from "react";
import "./QuanLyAudioMusic.css";
import { Table, Button, Modal, Form, Input, Select, Popconfirm, message, Space, Tag, Divider } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Them from "./Them";
import Sua from "./Sua";

const { Option } = Select
const { TextArea } = Input


export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [chucNang, setChucNang] = useState("");
  const [form] = Form.useForm();

  // Mock data
  useEffect(() => {
    const mockCourses = [
      {
        id: "1",
        instructor: "John Doe",
        category: "Web Development",
        status: "active",
        students: 120,
        actions: (
            <Space size="middle">
              <Button 
                  type="text" 
                  icon={<EditOutlined />} 
                  onClick={() => {
                    setChucNang(
                      <Sua
                        modalVisible={true}
                        setChucNang={setChucNang}
                      />
                    )
                  }} 
              />
              <Popconfirm
                title="Are you sure you want to delete this course?"
                okText="Yes"
                cancelText="No"
              >
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Popconfirm> 
            </Space>
        )
      },
      
    ]

    setCourses(mockCourses);
  }, [])



  const handleDelete = (id) => {
    const updatedCourses = courses.filter((course) => course.id !== id)
    setCourses(updatedCourses)
    message.success("Course deleted successfully")
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
      key: "instructor",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: [
        { text: "Web Development", value: "Web Development" },
        { text: "Programming", value: "Programming" },
        { text: "Design", value: "Design" },
        { text: "Data Science", value: "Data Science" },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "green"
        if(status === "draft") 
          color = "gold"
        if(status === "archived") 
          color = "volcano"

        return <Tag color={color}>{status.toUpperCase()}</Tag>
      },
      filters: [
        { text: "Active", value: "active" },
        { text: "Draft", value: "draft" },
        { text: "Archived", value: "archived" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Students",
      dataIndex: "students",
      key: "students",
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions"
    },
  ]

  return (
    <div className="QuanLyAudioMusic">
      <div className="mb-20">
        <h1 className="mb-20">Course Management</h1>
        <Button 
          className="" 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => {
            setChucNang(
              <Them
                modalVisible={true}
                setChucNang={setChucNang}
              />
            );
          }}
        >
          Add Course
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={courses} 
        rowKey="id" 
        pagination={{pageSize: 10}}
      />

      {chucNang}
    </div>
  )
}
