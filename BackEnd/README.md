# Music Streaming API

Đây là một dự án API dịch vụ phát nhạc trực tuyến được xây dựng bằng Django và Django REST Framework (DRF). Dự án cung cấp các chức năng tương tự như các nền tảng phát nhạc phổ biến như Spotify, bao gồm quản lý người dùng, duyệt danh mục nhạc, tạo playlist và theo dõi lịch sử phát nhạc.

---

## Mục lục

- [Music Streaming API](#music-streaming-api)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Danh sách API](#danh-sách-api)
  - [App Users](#app-users)
  - [App Music](#app-music)
  - [App Playlists](#app-playlists)
  - [App Streaming](#app-streaming)
- [Lưu ý quan trọng](#lưu-ý-quan-trọng)
- [Hướng dẫn cài đặt](#hướng-dẫn-cài-đặt)

---

## Cấu trúc thư mục

Dự án được tổ chức theo cấu trúc thư mục sau:

```
src/
├── manage.py
├── src/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── core/
│   ├── __init__.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── user.py
│   ├── serializers/
│   │   ├── __init__.py
│   │   └── user_serializer.py
│   ├── views/
│   │   ├── __init__.py
│   │   └── user_view.py
│   └── urls.py
```

---

## Danh sách API

### Users

| Phương thức | Endpoint                                      | Mô tả                                 |
|-------------|-----------------------------------------------|---------------------------------------|
| GET         | `/api/users/`                                 | Lấy danh sách users                   |
| POST        | `/api/users/`                                 | Tạo user mới                          |
| GET         | `/api/users/{id}/`                            | Lấy thông tin user cụ thể             |
| PUT         | `/api/users/{id}/`                            | Cập nhật thông tin user               |
| DELETE      | `/api/users/{id}/`                            | Xóa user                              |
| GET         | `/api/users/get_users/`                       | Lấy danh sách users (custom)          |
| POST        | `/api/users/register/`                        | Đăng ký tài khoản mới                 |
| POST        | `/api/users/login/`                           | Đăng nhập                             |
| POST        | `/api/users/request_password_reset/`          | Yêu cầu reset mật khẩu                |
| POST        | `/api/users/confirm_password_reset/`          | Xác nhận reset mật khẩu               |
| POST        | `/api/users/{id}/register_premium/`           | Đăng ký tài khoản premium             |
| PUT         | `/api/users/{id}/update_profile/`             | Cập nhật profile                      |
| PUT         | `/api/users/{id}/update_premium_status/`      | Cập nhật trạng thái premium           |
| PUT         | `/api/users/{id}/update_profile_image/`       | Cập nhật ảnh đại diện                 |

### Tracks

| Phương thức | Endpoint                        | Mô tả                                 |
|-------------|---------------------------------|---------------------------------------|
| GET         | `/api/tracks/`                  | Lấy danh sách tất cả track            |
| POST        | `/api/tracks/`                  | Tạo mới track                         |
| GET         | `/api/tracks/{id}/`             | Lấy chi tiết một track                |
| PUT         | `/api/tracks/{id}/`             | Cập nhật một track                    |
| DELETE      | `/api/tracks/{id}/`             | Xóa một track                         |
| GET         | `/api/tracks/get_tracks/`       | Lấy danh sách tất cả track (custom)   |
| GET         | `/api/tracks/get_track_by_id/{id}/` | Lấy chi tiết một track (custom)   |
| GET         | `/api/tracks/get_video_list/`   | Lấy danh sách video track             |
| GET         | `/api/tracks/get_video_by_id/{id}/` | Lấy chi tiết video track           |
| POST        | `/api/tracks/add_track/`        | Thêm mới track (custom)               |

### Genres

| Phương thức | Endpoint                        | Mô tả                                 |
|-------------|---------------------------------|---------------------------------------|
| GET         | `/api/genres/`                  | Lấy danh sách genre                   |
| POST        | `/api/genres/`                  | Tạo mới genre                         |
| GET         | `/api/genres/{id}/`             | Lấy chi tiết một genre                |
| PUT         | `/api/genres/{id}/`             | Cập nhật một genre                    |
| DELETE      | `/api/genres/{id}/`             | Xóa một genre                         |
| GET         | `/api/genres/get_genres/`       | Lấy danh sách genre có track          |
| GET         | `/api/genres/get_genre_by_id/{id}/` | Lấy chi tiết genre (custom)       |
| GET         | `/api/genres/get_tracks_by_genre/{id}/` | Lấy danh sách track theo genre  |
| POST        | `/api/genres/add_genre/`        | Thêm mới genre (custom)               |

### Playlists

| Phương thức | Endpoint                        | Mô tả                                 |
|-------------|---------------------------------|---------------------------------------|
| GET         | `/api/playlists/`               | Lấy danh sách playlist                |
| POST        | `/api/playlists/`               | Tạo mới playlist                      |
| GET         | `/api/playlists/{id}/`          | Lấy chi tiết playlist                 |
| PUT         | `/api/playlists/{id}/`          | Cập nhật playlist                     |
| DELETE      | `/api/playlists/{id}/`          | Xóa playlist                          |
| GET         | `/api/playlists/get_playlists/` | Lấy danh sách playlist (custom)       |
| GET         | `/api/playlists/get_playlist_by_id/{id}/` | Lấy chi tiết playlist (custom) |
| POST        | `/api/playlists/{id}/add_playlist/` | Thêm playlist cho user           |
| POST        | `/api/playlists/{id}/update_playlist/` | Cập nhật playlist                |
| POST        | `/api/playlists/{id}/delete_playlist/` | Xóa playlist                     |

### Playlist Tracks

| Phương thức | Endpoint                        | Mô tả                                 |
|-------------|---------------------------------|---------------------------------------|
| GET         | `/api/playlist_tracks/`         | Lấy danh sách playlist_track          |
| POST        | `/api/playlist_tracks/`         | Tạo mới playlist_track                |
| GET         | `/api/playlist_tracks/{id}/`    | Lấy chi tiết playlist_track           |
| PUT         | `/api/playlist_tracks/{id}/`    | Cập nhật playlist_track               |
| DELETE      | `/api/playlist_tracks/{id}/`    | Xóa playlist_track                    |
| GET         | `/api/playlist_tracks/get_playlist_tracks/{id}/` | Lấy track trong playlist      |
| POST        | `/api/playlist_tracks/add_playlist_track/` | Thêm track vào playlist        |
| POST        | `/api/playlist_tracks/delete_playlist_track/` | Xóa track khỏi playlist       |

### Favorite

| Phương thức | Endpoint                        | Mô tả                                 |
|-------------|---------------------------------|---------------------------------------|
| GET         | `/api/favorites/`               | Lấy danh sách favorite                |
| POST        | `/api/favorites/`               | Tạo mới favorite                      |
| GET         | `/api/favorites/{id}/`          | Lấy chi tiết favorite                 |
| PUT         | `/api/favorites/{id}/`          | Cập nhật favorite                     |
| DELETE      | `/api/favorites/{id}/`          | Xóa favorite                          |
| GET         | `/api/favorites/get_favorite_by_user_id/{id}/` | Lấy favorite theo user        |
| POST        | `/api/favorites/{id}/add_favorite/` | Thêm favorite cho user           |

### Favorite Tracks

| Phương thức | Endpoint                        | Mô tả                                 |
|-------------|---------------------------------|---------------------------------------|
| GET         | `/api/favorite_tracks/`         | Lấy danh sách favorite_track          |
| POST        | `/api/favorite_tracks/`         | Tạo mới favorite_track                |
| GET         | `/api/favorite_tracks/{id}/`    | Lấy chi tiết favorite_track           |
| PUT         | `/api/favorite_tracks/{id}/`    | Cập nhật favorite_track               |
| DELETE      | `/api/favorite_tracks/{id}/`    | Xóa favorite_track                    |
| GET         | `/api/favorite_tracks/get_favorite_tracks/{id}/` | Lấy track yêu thích của user  |
| POST        | `/api/favorite_tracks/add_favorite_track/` | Thêm track vào favorite         |
| POST        | `/api/favorite_tracks/delete_favorite_track/` | Xóa track khỏi favorite        |

---

## Hướng dẫn cài đặt

### 1. Cài đặt Python và các công cụ cần thiết

1. **Cài đặt Python 3.8+**:
   - Tải và cài đặt Python từ [python.org](https://www.python.org/downloads/)
   - Kiểm tra cài đặt: `python --version`

2. **Cài đặt Git**:
   - Tải và cài đặt Git từ [git-scm.com](https://git-scm.com/downloads)
   - Kiểm tra cài đặt: `git --version`

### 2. Clone và cài đặt dự án

1. **Clone dự án**:
   ```bash
   git clone https://github.com/Tinhs05/CloneSpotify_Backend.git
   cd Spotify_BE
   ```

2. **Tạo và kích hoạt môi trường ảo**:
   ```bash
   # Windows
   python -m venv .venv
   .venv\Scripts\activate

   # Linux/Mac
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. **Cài đặt các thư viện cần thiết**:
   ```bash
   pip install -r requirements.txt
   ```

### 3. Cấu hình cơ sở dữ liệu

1. **Cài đặt MySQL**:
   - Tải và cài đặt MySQL từ [mysql.com](https://dev.mysql.com/downloads/)
   - Tạo database mới:
     ```sql
     CREATE DATABASE musicapp;
     ```

2. **Cấu hình database trong settings.py**:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.mysql',
           'NAME': 'musicapp',
           'USER': 'root',
           'PASSWORD': '',
           'HOST': 'localhost',
           'PORT': '3307',
       }
   }
   ```

### 4. Chạy migrations

1. **Tạo migrations**:
   ```bash
   python src/manage.py makemigrations
   ```

2. **Áp dụng migrations**:
   ```bash
   python src/manage.py migrate
   ```

### 5. Tạo superuser

```bash
python src/manage.py createsuperuser
```

### 6. Chạy server

```bash
python src/manage.py runserver
```

Server sẽ chạy tại `http://localhost:8000`

### 7. Kiểm tra API

1. **Đăng ký tài khoản mới**:
   ```bash
   curl -X POST http://localhost:8000/api/users/register/ \
   -H "Content-Type: application/json" \
   -d '{
     "username": "testuser",
     "email": "test@example.com",
     "password": "password123",
     "confirm_password": "password123"
   }'
   ```

2. **Đăng nhập**:
   ```bash
   curl -X POST http://localhost:8000/api/users/login/ \
   -H "Content-Type: application/json" \
   -d '{
     "username": "testuser",
     "password": "password123"
   }'
   ```

---

## Lưu ý quan trọng

1. **Xác thực**:
   - Hầu hết các API yêu cầu JWT token
   - Thêm token vào header: `Authorization: Bearer <token>`

2. **Quyền truy cập**:
   - Một số API yêu cầu quyền admin
   - Kiểm tra quyền trước khi gọi API

3. **File upload**:
   - Sử dụng `multipart/form-data` cho upload file
   - Kích thước file tối đa: 5MB

4. **Rate limiting**:
   - Giới hạn: 100 requests/phút
   - Vượt quá giới hạn sẽ bị block 1 giờ

---

## Hỗ trợ

Nếu bạn gặp vấn đề hoặc cần hỗ trợ, vui lòng:
1. Kiểm tra [Issues](https://github.com/Tinhs05/CloneSpotify_Backend/issues)
2. Tạo issue mới nếu chưa có
3. Liên hệ qua email: your-email@example.com
