import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './DangNhap.module.scss';

const cx = classNames.bind(styles);

function DangNhap() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/users/login/', {
                username,
                password,
            });

            if (response.data) {
                // Lưu thông tin user vào localStorage
                localStorage.setItem('user', JSON.stringify({
                    id: response.data.id,
                    username: response.data.username,
                    role: response.data.role
                }));

                // Chuyển hướng dựa vào role
                if (response.data.role === 0) {
                    window.location.href = '/home';  
                } else if (response.data.role === 1) {
                    window.location.href = '/admin/dashboard'; 
                } else {
                    window.location.href = '/'; 
                }
            }
        } catch (error) {
            setError('Tên đăng nhập hoặc mật khẩu không đúng');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2>Đăng Nhập</h2>
                {error && <div className={cx('error')}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className={cx('form-group')}>
                        <label>Tên đăng nhập:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label>Mật khẩu:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Đăng Nhập</button>
                </form>
            </div>
        </div>
    );
}

export default DangNhap; 