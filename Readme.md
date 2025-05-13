

**HỌC PHẦN: PHÁT TRIỂN PHẦN MỀM MÃ NGUỒN MỞ**

**BÁO CÁO ĐỒ ÁN**

**ĐỀ TÀI:**

**CLONE SPOTIFY**

**Mail**: <tuankhuongk@gmail.com>

**Nhóm sinh viên thực hiện:** Đặng Ngọc Tính - 3121410511

Hồ Sĩ Tịnh - 3121410512

Trần Tuấn Khuông - 3122560036

Vũ Lê Đức Anh - 3122560002

**Giảng viên hướng dẫn: Từ Lãng Phiêu**

TP. HCM THÁNG 05/2025

Bảng phân công công việc của nhóm:

| STT | Họ và Tên | % Công việc |
| --- | --- | --- |
| 1   | Đặng Ngọc Tín | 100% |
| --- | --- | --- |
| 2   | Hồ Sĩ Tịnh | 100% |
| --- | --- | --- |
| 3   | Trần Tuấn Khuông | 100% |
| --- | --- | --- |
| 4   | Vũ Lê Đức Anh | 100% |
| --- | --- | --- |
| 5   |     |     |
| --- | --- | --- |

**NHẬN XÉT CỦA GIẢNG VIÊN**

………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………

………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………

……………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………

#

# LỜI CẢM ƠN

Chúng em xin chân thành cảm ơn đến thầy **Từ Lãng Phiêu** – giảng viên bộ môn “Phát triển phần mềm mã nguồn mở” thuộc Khoa Công Nghệ Thông Tin, trường Đại học Sài Gòn, đã trang bị cho chúng em những kiến thức, kỹ năng cơ bản cần có để có thể hoàn thành đồ án này.

Tuy nhiên, trong quá trình hoàn thiện đồ án, với vốn kiến thức cũng như kinh nghiệm còn rất khiêm tốn và là bước đầu làm quen với công việc nghiên cứu mang tính thực nghiệm, chúng em vẫn còn nhiều thiếu sót, hạn chế trong việc tìm hiểu và xây dựng đồ án về này. Rất mong được sự quan tâm, góp ý của thầy để đồ án của chúng em được đầy đủ và hoàn chỉnh hơn.

Xin kính chúc thầy **Từ Lãng Phiêu** dồi dào sức khỏe và hạnh phúc để tiếp tục thực hiện sứ mệnh cao đẹp của mình là truyền đạt kiến thức cho thế hệ mai sau.

Xin chân thành cảm ơn.

Tp.HCM ngày 01 tháng 05 năm 2025

_Sinh viên thực hiện_

Đặng Ngọc Tính

Hồ Sĩ Tịnh

Trần Tuấn Khuông

Vũ Lê Đức Anh

**MỤC LỤC**

[I. CƠ SỞ LÝ THUYẾT](#_2et92p0) 6

[1\. Mục tiêu](#_74j83qo452i3) 6

[2\. Mô tả tổng quát về hệ thống xây dựng](#_1t3h5sf) 7

3\. Hướng giải quyết dự kiến 8

[4\. Công cụ và môi trường phát triển 9](#_e6r4pboc074v)

[5\. Đặc tả chức năng 13](#_x9xoilft631v)

[II. THIẾT KẾ VÀ PHÂN TÍCH DATABASE 16](#_nfzjhhkbxmi)

[1\. Bảng users: 16](#_ry6o6nmau7t6)

[2\. Bảng songs: 16](#_h713v8inyw8g)

[3\. Bảng genres: 17](#_tx87uhxyshhl)

[4\. Bảng playlist_songs: 18](#_l4fzwata0qwm)

[5\. Bảng favorite_songs: 18](#_k01j9hxkzmyr)

[III. THIẾT KẾ VÀ CÀI ĐẶT CHƯƠNG TRÌNH 19](#_68s1ftvkrn9x)

[1\. Backend (Django - Thư mục clonespotify_backend) 19](#_w7pz8rgqhwjt)

[2\. Thiết kế chương trình (Frontend): 22](#_9zfjv8tzwjk4)

[TỔNG KẾT 25](#_2iq8gzs)

#

#

# CƠ SỞ LÝ THUYẾT

## 1\. Mục tiêu

Mục tiêu của dự án "clone Spotify" sử dụng React, Python và Django, có thể tóm gọn lại một số mục tiêu chính sau:

- Hiểu rõ triết lý và lợi ích của phần mềm mã nguồn mở (PMNM): Môn học nhằm giúp bạn nắm bắt được các khái niệm cốt lõi của PMNM, lịch sử phát triển, các loại giấy phép phổ biến (ví dụ: MIT, Apache, GPL), và những lợi ích mà PMNM mang lại cho cả người dùng và nhà phát triển (tính minh bạch, cộng đồng hỗ trợ lớn, khả năng tùy biến cao, chi phí tiềm năng thấp hơn).  

- Nắm vững quy trình phát triển phần mềm mã nguồn mở: Bạn sẽ được làm quen với cách một dự án mã nguồn mở được xây dựng và duy trì, bao gồm việc đóng góp mã nguồn, báo cáo lỗi, tham gia vào cộng đồng, và quản lý dự án.  

- Áp dụng kiến thức về các công nghệ cụ thể trong bối cảnh mã nguồn mở: Việc lựa chọn React (một thư viện JavaScript mã nguồn mở), Python (một ngôn ngữ lập trình mã nguồn mở), và Django (một framework web Python mã nguồn mở) cho dự án "clone Spotify" sẽ giúp bạn hiểu cách các công nghệ mã nguồn mở này được sử dụng trong thực tế để xây dựng một ứng dụng hoàn chỉnh.  

- Phát triển kỹ năng thực hành xây dựng ứng dụng web full-stack: Dự án "clone Spotify" đòi hỏi bạn phải làm việc cả ở frontend (React) và backend (Django/Python), cũng như tương tác với cơ sở dữ liệu. Điều này giúp bạn rèn luyện kỹ năng phát triển ứng dụng web toàn diện.  

- Làm quen với quy trình làm việc nhóm và quản lý dự án (nếu làm việc nhóm): Nếu bạn thực hiện dự án này theo nhóm, môn học cũng có thể hướng đến việc phát triển kỹ năng làm việc nhóm, phân chia công việc, quản lý tiến độ, và sử dụng các công cụ hỗ trợ cộng tác (ví dụ: Git, GitHub/GitLab).  

- Hiểu về các khía cạnh pháp lý và cộng đồng của PMNM: Môn học có thể đề cập đến tầm quan trọng của việc tuân thủ giấy phép mã nguồn mở và cách tương tác hiệu quả với cộng đồng mã nguồn mở.  

- Khuyến khích tư duy sáng tạo và khả năng giải quyết vấn đề: Dự án "clone Spotify" là một bài toán thực tế, đòi hỏi bạn phải đưa ra các quyết định thiết kế, giải quyết các vấn đề kỹ thuật phát sinh, và tìm kiếm các giải pháp hiệu quả.  

Tóm lại, mục tiêu của môn học này không chỉ là giúp bạn xây dựng một ứng dụng "clone Spotify" mà còn trang bị cho bạn những kiến thức và kỹ năng cần thiết để làm việc hiệu quả với các dự án phần mềm mã nguồn mở trong tương lai. Chúc bạn có một trải nghiệm học tập thú vị và thành công với dự án của mình!

## 2\. Mô tả tổng quát về hệ thống xây dựng

Hệ thống clone Spotify này tập trung vào việc quản lý và cung cấp trải nghiệm nghe nhạc, bao gồm:

- Quản lý thư viện nhạc: Tổ chức một kho tàng âm nhạc khổng lồ với các bài hát, album, nghệ sĩ, thể loại khác nhau. Dữ liệu này được sắp xếp một cách khoa học, cho phép người dùng dễ dàng tìm kiếm và khám phá.
- Quản lý người dùng: Hỗ trợ người dùng đăng ký tài khoản, đăng nhập và quản lý thông tin cá nhân. Có thể bao gồm các tính năng như tạo playlist cá nhân, theo dõi nghệ sĩ yêu thích, và xem lịch sử nghe nhạc.
- Chức năng phát nhạc: Cung cấp khả năng phát trực tuyến các bài hát với chất lượng âm thanh tốt. Các tính năng điều khiển cơ bản như phát/tạm dừng, chuyển bài, tua nhanh/tua lại, điều chỉnh âm lượng là không thể thiếu.
- Tìm kiếm và khám phá: Cho phép người dùng dễ dàng tìm kiếm các bài hát, nghệ sĩ hoặc album theo từ khóa. Đồng thời, hệ thống có thể gợi ý nhạc dựa trên sở thích, lịch sử nghe hoặc các playlist được tạo sẵn.
- Quản lý playlist: Người dùng có khả năng tạo, chỉnh sửa và chia sẻ các playlist nhạc cá nhân.

Với giao diện người dùng trực quan và dễ sử dụng (được xây dựng bằng React), hệ thống clone Spotify mang đến sự thuận tiện trong thao tác, giúp người dùng dễ dàng tiếp cận và tận hưởng âm nhạc. Phần backend mạnh mẽ (xây dựng bằng Python và framework Django) đảm bảo việc quản lý dữ liệu hiệu quả, xử lý các yêu cầu từ người dùng một cách nhanh chóng và ổn định, đồng thời có khả năng mở rộng để đáp ứng lượng người dùng ngày càng tăng.

Hệ thống được xây dựng với tiêu chí linh hoạt, dễ dàng bổ sung các tính năng mới và điều chỉnh để phù hợp với nhu cầu và mong muốn của người dùng yêu âm nhạc.

Kiến trúc hệ thống:

- Nghiên cứu về kiến trúc client-server: Hiểu rõ cách frontend React gửi yêu cầu đến backend Django API và nhận dữ liệu.
- Phân tích cách các thành phần tương tác: Mô tả luồng dữ liệu giữa frontend, backend và cơ sở dữ liệu cho các tính năng chính (ví dụ: phát một bài hát, tìm kiếm).
- Cân nhắc về kiến trúc microservices (nếu có ý định mở rộng trong tương lai): Mặc dù có thể không nằm trong phạm vi triển khai hiện tại, nhưng việc nghiên cứu sơ bộ về kiến trúc này có thể hữu ích cho phần thảo luận về khả năng mở rộng.

## Hướng giải quyết dự kiến

Tiếp cận theo từng giai đoạn:

- Giai đoạn 1: Nghiên cứu và Lập kế hoạch chi tiết:
  - Nghiên cứu sâu hơn về các tính năng cốt lõi của Spotify: Phân tích luồng người dùng, các API (nếu có thông tin công khai), và cách dữ liệu được hiển thị.
  - Thiết kế kiến trúc hệ thống ở mức độ tổng quan: Vẽ sơ đồ các thành phần chính (React frontend, Django REST API backend, Database) và cách chúng tương tác.
  - Lập kế hoạch phát triển chi tiết: Chia nhỏ dự án thành các task nhỏ hơn, xác định công nghệ cụ thể cho từng phần (ví dụ: thư viện UI cho React, ORM cho Django), và ước tính thời gian thực hiện.
  - Xây dựng wireframe/mockup giao diện người dùng (UI/UX) cơ bản: Hình dung giao diện chính của ứng dụng.
- Giai đoạn 2: Phát triển Backend (Django REST API):
  - Thiết kế schema cơ sở dữ liệu: Xác định các bảng cần thiết (Bài hát, Nghệ sĩ, Album, Người dùng, Playlist) và mối quan hệ giữa chúng.
  - Xây dựng Models trong Django: Định nghĩa các model tương ứng với schema cơ sở dữ liệu.
  - Phát triển API Endpoints bằng Django REST Framework: Xây dựng các API cho các chức năng chính như lấy danh sách bài hát, tìm kiếm, tạo/xem playlist, quản lý người dùng (đăng ký, đăng nhập cơ bản).
  - Triển khai các logic nghiệp vụ cơ bản ở backend: Ví dụ: xử lý tìm kiếm, thêm bài hát vào playlist.
- Giai đoạn 3: Phát triển Frontend (React):
  - Thiết lập môi trường phát triển React.
  - Xây dựng các components giao diện người dùng: Tạo các component hiển thị danh sách bài hát, thông tin bài hát đang phát, thanh điều khiển nhạc, v.v.
  - Kết nối với Backend API: Sử dụng fetch hoặc các thư viện HTTP client khác (ví dụ: Axios) để gọi các API đã xây dựng ở backend.
  - Quản lý state ở frontend: Sử dụng useState, useContext hoặc các thư viện quản lý state phức tạp hơn nếu cần.
  - Xử lý tương tác người dùng: Xử lý các sự kiện như click nút phát, tạm dừng, tìm kiếm, thêm vào playlist.
- Giai đoạn 4: Kiểm thử và Hoàn thiện:
  - Viết unit tests cho backend (Django) và component tests cho frontend (React).
  - Kiểm thử tích hợp giữa frontend và backend.
  - Sửa lỗi và tối ưu hóa hiệu suất.
  - Hoàn thiện giao diện người dùng và trải nghiệm người dùng.
- Giai đoạn 5: Viết Báo cáo:
  - Hệ thống hóa các kiến thức đã nghiên cứu và quá trình phát triển.
  - Trình bày các quyết định thiết kế, các vấn đề đã gặp phải và cách giải quyết.
  - Đánh giá kết quả đạt được so với mục tiêu ban đầu.
  - Đề xuất các hướng phát triển tiếp theo.

Các công cụ và thư viện hỗ trợ:

- Frontend (React): Sử dụng các thư viện UI component có sẵn để tiết kiệm thời gian phát triển giao diện.
- Backend (Django): Tận dụng các tính năng mạnh mẽ của Django như ORM, quản lý người dùng (nếu cần), và Django REST Framework để xây dựng API nhanh chóng.
- Quản lý dự án: Sử dụng các công cụ quản lý dự án (ví dụ: Trello, Asana) để theo dõi tiến độ và quản lý công việc.
- Kiểm soát phiên bản: Sử dụng Git và các nền tảng như GitHub hoặc GitLab để quản lý mã nguồn.

## Công cụ và môi trường phát triển

Visual Studio Code (VS Code): Trình soạn thảo mã nguồn (IDE)

- Thông tin: VS Code là một trình soạn thảo mã nguồn miễn phí, mạnh mẽ và rất phổ biến, được phát triển bởi Microsoft. Nó nổi tiếng với giao diện trực quan, hiệu suất tốt và khả năng mở rộng cao thông qua các extensions (tiện ích mở rộng).
- Lợi ích cho dự án của bạn:
  - Hỗ trợ ngôn ngữ tuyệt vời: VS Code có hỗ trợ cú pháp, gợi ý mã (IntelliSense), debugging (gỡ lỗi) tích hợp cho cả JavaScript (React) và Python (Django). Bạn có thể cài đặt các extension cụ thể cho từng ngôn ngữ để có trải nghiệm tốt nhất.
  - Terminal tích hợp: Bạn có thể chạy các lệnh terminal trực tiếp bên trong VS Code, rất tiện lợi cho việc quản lý dự án React (ví dụ: npm start, yarn start) và Django (ví dụ: python manage.py runserver, python manage.py makemigrations).
  - Quản lý Git tích hợp: VS Code có tích hợp sẵn các tính năng quản lý Git, giúp bạn dễ dàng commit, push, pull, branch, merge code.
  - Khả năng mở rộng: Cộng đồng VS Code rất lớn và có vô số extensions hữu ích cho React (ví dụ: ES7 React/Redux/GraphQL/React-Native snippets), Python (ví dụ: Python), Django (ví dụ: Django), và các công cụ khác (ví dụ: Prettier cho formatting code, ESLint cho linting JavaScript).
  - Debugging mạnh mẽ: VS Code cung cấp các công cụ debugging trực quan cho cả JavaScript (Node.js, trình duyệt) và Python, giúp bạn dễ dàng tìm và sửa lỗi trong code.

MySQL: Hệ quản trị cơ sở dữ liệu quan hệ (RDBMS)

- Thông tin: MySQL là một hệ quản trị cơ sở dữ liệu mã nguồn mở rất phổ biến, được biết đến với tính ổn định, độ tin cậy và hiệu suất tốt. Nó lưu trữ dữ liệu của ứng dụng một cách có cấu trúc, cho phép bạn truy vấn và quản lý dữ liệu hiệu quả.
- Vai trò trong dự án của bạn:
  - Lưu trữ dữ liệu ứng dụng: MySQL sẽ được sử dụng để lưu trữ tất cả các dữ liệu liên quan đến ứng dụng "clone Spotify" của bạn, bao gồm thông tin về bài hát, nghệ sĩ, album, người dùng, playlist, lịch sử nghe nhạc, v.v.
  - Tương tác thông qua Django ORM: Django cung cấp một Object-Relational Mapper (ORM), cho phép bạn tương tác với cơ sở dữ liệu MySQL bằng cách sử dụng các lớp và đối tượng Python, thay vì viết trực tiếp các câu lệnh SQL phức tạp. Điều này giúp việc phát triển trở nên nhanh chóng và dễ bảo trì hơn.
- Tích hợp với Django: Django có hỗ trợ tốt cho MySQL. Bạn sẽ cần cài đặt driver kết nối MySQL cho Python (thường là mysqlclient) và cấu hình thông tin kết nối cơ sở dữ liệu (host, port, username, password, database name) trong file settings.py của dự án Django.

React: Thư viện JavaScript cho xây dựng giao diện người dùng (Frontend Library)

- Thông tin: React là một thư viện JavaScript mã nguồn mở được phát triển bởi Facebook (Meta). Nó tập trung vào việc xây dựng các thành phần giao diện người dùng (UI components) có khả năng tái sử dụng, giúp việc phát triển các ứng dụng web phức tạp trở nên dễ dàng quản lý và bảo trì hơn.
- Vai trò trong dự án của bạn:
  - Xây dựng giao diện người dùng tương tác: React sẽ được sử dụng để tạo ra giao diện người dùng động và tương tác cho ứng dụng "clone Spotify" của bạn. Người dùng có thể duyệt thư viện nhạc, tìm kiếm, tạo playlist, điều khiển việc phát nhạc, v.v. thông qua giao diện này.
  - Component-based architecture: React khuyến khích việc chia nhỏ giao diện thành các component nhỏ, độc lập và có thể tái sử dụng. Điều này giúp code dễ hiểu, dễ bảo trì và dễ phát triển hơn.
  - Virtual DOM: React sử dụng một cơ chế Virtual DOM để tối ưu hóa việc cập nhật giao diện, chỉ thực hiện các thay đổi thực sự cần thiết trên DOM của trình duyệt, giúp ứng dụng chạy mượt mà hơn.
  - Tương tác với Backend API: React sẽ gửi các yêu cầu đến API backend được xây dựng bằng Django để lấy dữ liệu (ví dụ: danh sách bài hát, thông tin nghệ sĩ) và gửi dữ liệu (ví dụ: tạo playlist mới).

Python: Ngôn ngữ lập trình đa năng (Backend Language)

- Thông tin: Python là một ngôn ngữ lập trình thông dịch, cấp cao, đa năng và rất phổ biến. Nó nổi tiếng với cú pháp rõ ràng, dễ đọc và một hệ sinh thái thư viện phong phú cho nhiều mục đích khác nhau.
- Vai trò trong dự án của bạn:
  - Ngôn ngữ chính cho Backend: Python sẽ là ngôn ngữ chính được sử dụng để xây dựng logic nghiệp vụ của backend, xử lý các yêu cầu từ frontend, tương tác với cơ sở dữ liệu MySQL, và xây dựng API.
  - Hệ sinh thái Django: Python là nền tảng của framework Django, cung cấp nhiều công cụ và thư viện mạnh mẽ cho việc phát triển web.

Django: Framework web cấp cao của Python (Backend Framework)

- Thông tin: Django là một framework web mã nguồn mở, cấp cao, được viết bằng Python. Nó tuân theo kiến trúc Model-Template-View (MTV) và cung cấp nhiều tính năng "out-of-the-box" giúp việc phát triển các ứng dụng web phức tạp trở nên nhanh chóng và dễ dàng hơn.
- Vai trò trong dự án của bạn:
  - Xây dựng Backend API (với Django REST Framework): Django kết hợp với Django REST Framework sẽ giúp bạn xây dựng các API endpoints mạnh mẽ và dễ quản lý để frontend React có thể giao tiếp.
  - Quản lý Models và tương tác với Database: Django ORM giúp bạn định nghĩa cấu trúc dữ liệu (Models) và tương tác với cơ sở dữ liệu MySQL một cách dễ dàng.
  - Xử lý Routing (URLs): Django giúp bạn định nghĩa các URL của ứng dụng và ánh xạ chúng đến các view (hàm xử lý logic).
  - Quản lý xác thực và phân quyền (nếu cần): Django cung cấp các công cụ tích hợp để quản lý người dùng, xác thực và phân quyền truy cập.
  - Cấu trúc dự án rõ ràng: Django khuyến khích một cấu trúc dự án có tổ chức, giúp bạn dễ dàng quản lý và bảo trì code.

Môi trường phát triển dự kiến:

- Hệ điều hành: Windows, macOS hoặc Linux (VS Code hỗ trợ đa nền tảng).
- Python: Được cài đặt trên hệ thống.
- pip: Trình quản lý gói của Python để cài đặt Django và các thư viện khác (ví dụ: mysqlclient, Django REST Framework).
- Node.js và npm (hoặc yarn): Cần thiết để quản lý các gói và chạy ứng dụng React.
- MySQL Server: Cài đặt và cấu hình một instance của MySQL Server trên máy của bạn hoặc một máy chủ khác.
- VS Code: Trình soạn thảo mã nguồn chính.
- Các extension VS Code: Cài đặt các extension hỗ trợ cho Python, Django, React, JavaScript, Git, và các công cụ hỗ trợ khác.
- Virtual Environment (Python): Nên sử dụng virtual environment (ví dụ: venv hoặc conda) để quản lý các dependencies của dự án Python một cách độc lập.

## Đặc tả chức năng

Quản lý Người dùng (User Management)

- Đăng ký tài khoản (User Registration):
  - Người dùng có thể tạo tài khoản mới bằng cách cung cấp các thông tin:
    - Tên người dùng (username) - _bắt buộc, duy nhất_
    - Địa chỉ email (email) - _bắt buộc, định dạng hợp lệ, duy nhất_
    - Mật khẩu (password) - _bắt buộc, đáp ứng các yêu cầu về độ dài và độ phức tạp (nếu có)_
  - Hệ thống sẽ xác thực dữ liệu đầu vào.
  - Sau khi đăng ký thành công, người dùng sẽ được tạo một tài khoản mới trong hệ thống.
  - (Tùy chọn) Hệ thống có thể gửi email xác thực tài khoản.
- Đăng nhập (User Login):
  - Người dùng có thể đăng nhập bằng cách cung cấp tên người dùng hoặc địa chỉ email và mật khẩu đã đăng ký.
  - Hệ thống sẽ xác thực thông tin đăng nhập.
  - Sau khi đăng nhập thành công, hệ thống sẽ trả về một token xác thực (ví dụ: JWT - JSON Web Token) để người dùng sử dụng cho các yêu cầu API tiếp theo.
- Đăng xuất (User Logout):
  - Người dùng có thể vô hiệu hóa token xác thực hiện tại.
- Quên mật khẩu (Forgot Password):
  - Người dùng có thể yêu cầu đặt lại mật khẩu bằng cách cung cấp địa chỉ email đã đăng ký.
  - Hệ thống sẽ gửi một email chứa liên kết hoặc mã đặt lại mật khẩu đến địa chỉ email đó.
  - Người dùng có thể sử dụng liên kết/mã để đặt lại mật khẩu mới.

Duyệt Danh Mục Nhạc (Browse Music Catalog)

- Lấy danh sách bài hát (Get Song List):
  - API cho phép truy xuất danh sách tất cả các bài hát có trong hệ thống (có thể có phân trang).
  - Có thể hỗ trợ các tham số truy vấn để lọc và sắp xếp (ví dụ: theo tên bài hát, nghệ sĩ, album, ngày phát hành).
- Lấy thông tin chi tiết bài hát (Get Song Details):
  - API cho phép truy xuất thông tin chi tiết của một bài hát cụ thể dựa trên ID của bài hát. Thông tin có thể bao gồm tên bài hát, nghệ sĩ, album, năm phát hành, thể loại, đường dẫn file nhạc.
- Lấy danh sách nghệ sĩ (Get Artist List):
  - API cho phép truy xuất danh sách tất cả các nghệ sĩ có trong hệ thống (có thể có phân trang).
- Lấy thông tin chi tiết nghệ sĩ (Get Artist Details):
  - API cho phép truy xuất thông tin chi tiết của một nghệ sĩ cụ thể dựa trên ID của nghệ sĩ. Thông tin có thể bao gồm tên nghệ sĩ, tiểu sử (nếu có), danh sách các album và bài hát liên quan.
- Lấy danh sách album (Get Album List):
  - API cho phép truy xuất danh sách tất cả các album có trong hệ thống (có thể có phân trang).
- Lấy thông tin chi tiết album (Get Album Details):
  - API cho phép truy xuất thông tin chi tiết của một album cụ thể dựa trên ID của album. Thông tin có thể bao gồm tên album, nghệ sĩ, năm phát hành, danh sách các bài hát trong album, ảnh bìa.
- Lấy danh sách thể loại (Get Genre List):
  - API cho phép truy xuất danh sách tất cả các thể loại nhạc có trong hệ thống.
- Lấy danh sách bài hát theo thể loại (Get Songs by Genre):
  - API cho phép truy xuất danh sách các bài hát thuộc một thể loại cụ thể.

Quản lý Playlist (Playlist Management)

- Tạo playlist (Create Playlist):
  - Người dùng đã xác thực có thể tạo playlist mới bằng cách cung cấp tên cho playlist.
- Lấy danh sách playlist của người dùng (Get User Playlists):
  - Người dùng đã xác thực có thể truy xuất danh sách tất cả các playlist mà họ đã tạo.
- Lấy thông tin chi tiết playlist (Get Playlist Details):
  - Người dùng đã xác thực (hoặc có quyền truy cập) có thể truy xuất thông tin chi tiết của một playlist cụ thể dựa trên ID của playlist, bao gồm tên playlist và danh sách các bài hát trong đó.
- Thêm bài hát vào playlist (Add Song to Playlist):
  - Người dùng đã xác thực có thể thêm một bài hát cụ thể (dựa trên ID bài hát) vào một playlist mà họ sở hữu.
- Xóa bài hát khỏi playlist (Remove Song from Playlist):
  - Người dùng đã xác thực có thể xóa một bài hát cụ thể khỏi một playlist mà họ sở hữu.
- Cập nhật thông tin playlist (Update Playlist Details):
  - Người dùng đã xác thực có thể cập nhật thông tin của một playlist mà họ sở hữu (ví dụ: đổi tên playlist).
- Xóa playlist (Delete Playlist):
  - Người dùng đã xác thực có thể xóa một playlist mà họ sở hữu.

Lịch Sử Phát Nhạc (Playback History)

- Ghi lại lịch sử phát nhạc (Record Playback History):
  - Khi một người dùng đã xác thực phát một bài hát, hệ thống sẽ ghi lại thông tin về bài hát đó và thời điểm phát.
- Lấy lịch sử phát nhạc của người dùng (Get User Playback History):
  - Người dùng đã xác thực có thể truy xuất lịch sử các bài hát mà họ đã nghe (có thể có phân trang và giới hạn số lượng).
  - Có thể hỗ trợ lọc theo khoảng thời gian.

Tìm kiếm (Search)

- Tìm kiếm tổng quát (General Search):
  - API cho phép người dùng tìm kiếm thông tin trong toàn bộ hệ thống (bài hát, nghệ sĩ, album, playlist) dựa trên một từ khóa.
  - Kết quả tìm kiếm có thể được nhóm theo loại (ví dụ: bài hát, nghệ sĩ, album).

Phát nhạc (Playback - Có thể không phải là API thuần túy, nhưng cần xem xét)

- (Có thể là một endpoint để lấy đường dẫn phát nhạc): API có thể cung cấp một endpoint trả về đường dẫn (URL) đến file audio của một bài hát cụ thể để client có thể phát. Cần xem xét vấn đề bảo mật và quyền truy cập.

# THIẾT KẾ VÀ PHÂN TÍCH DATABASE

## Bảng users

- Mục đích: Lưu trữ thông tin về người dùng của ứng dụng.
- Các cột:
  - id (INT, PRIMARY KEY, AUTO_INCREMENT - ngầm định): Khóa chính, định danh duy nhất cho mỗi người dùng.
  - username (TEXT, NOT NULL, UNIQUE HASH): Tên người dùng, bắt buộc và duy nhất. Sử dụng HASH index cho hiệu suất truy vấn tốt khi tìm kiếm theo tên người dùng.
  - email (TEXT, NOT NULL, UNIQUE HASH): Địa chỉ email của người dùng, bắt buộc và duy nhất. Tương tự, HASH index giúp tăng tốc độ tìm kiếm theo email.
  - password (TEXT, NOT NULL): Mật khẩu của người dùng (lưu ý cần được mã hóa an toàn trước khi lưu vào database).
  - profile_image_path (TEXT, DEFAULT NULL): Đường dẫn đến ảnh đại diện của người dùng (tùy chọn).
  - created_at (DATETIME, DEFAULT current_timestamp()): Thời điểm người dùng tạo tài khoản, tự động được gán giá trị thời gian hiện tại khi một bản ghi mới được thêm vào.
  - isPremium (TINYINT(1), DEFAULT 0): Trường boolean (0 hoặc 1) cho biết người dùng có phải là tài khoản premium hay không (mặc định là không).

Phân tích: Bảng này chứa các thông tin cơ bản cần thiết để quản lý người dùng, bao gồm thông tin đăng nhập, thông tin cá nhân tùy chọn và trạng thái tài khoản (premium/free).

## Bảng songs

- Mục đích: Lưu trữ thông tin về các bài hát trong thư viện nhạc.
- Các cột:
  - id (INT, PRIMARY KEY, AUTO_INCREMENT - ngầm định): Khóa chính, định danh duy nhất cho mỗi bài hát.
  - title (TEXT, NOT NULL): Tiêu đề của bài hát, bắt buộc.
  - duration (INT, DEFAULT NULL): Thời lượng của bài hát (có thể tính bằng giây).
  - artist (TEXT, DEFAULT NULL): Tên nghệ sĩ trình bày bài hát.
  - genre_id (INT, DEFAULT NULL, FOREIGN KEY references genres): Khóa ngoại, liên kết bài hát với thể loại của nó trong bảng genres. Cho phép một bài hát thuộc về một thể loại.
  - audio_file_path (TEXT, DEFAULT NULL): Đường dẫn đến file audio của bài hát.
  - video_file_path (TEXT, DEFAULT NULL): Đường dẫn đến file video của bài hát (tùy chọn).
  - image_file_path (TEXT, DEFAULT NULL): Đường dẫn đến ảnh bìa của bài hát (tùy chọn).
  - isPrenium (TINYINT(1), DEFAULT 0): Trường boolean cho biết bài hát này có phải là nội dung premium hay không (mặc định là không).

Phân tích: Bảng này chứa thông tin chi tiết về mỗi bài hát, bao gồm tiêu đề, nghệ sĩ, thời lượng, liên kết đến thể loại và các đường dẫn đến các file media liên quan. Trường isPrenium cho phép phân biệt nội dung dành cho người dùng trả phí.

## Bảng genres

- Mục đích: Lưu trữ thông tin về các thể loại nhạc.
- Các cột:
  - id (INT, PRIMARY KEY, AUTO_INCREMENT - ngầm định): Khóa chính, định danh duy nhất cho mỗi thể loại.
  - name (TEXT, NOT NULL, UNIQUE HASH): Tên của thể loại, bắt buộc và duy nhất. Sử dụng HASH index để đảm bảo tìm kiếm và kiểm tra trùng lặp tên thể loại hiệu quả.

Bảng này đơn giản chứa danh sách các thể loại nhạc có trong hệ thống, đảm bảo tính nhất quán khi gán thể loại cho các bài hát.

Bảng playlists:

- Mục đích: Lưu trữ thông tin về các playlist do người dùng tạo.
- Các cột:
  - id (INT, PRIMARY KEY, AUTO_INCREMENT - ngầm định): Khóa chính, định danh duy nhất cho mỗi playlist.
  - name (TEXT, NOT NULL): Tên của playlist, bắt buộc.
  - user_id (INT, NOT NULL, FOREIGN KEY references users): Khóa ngoại, liên kết playlist với người dùng đã tạo nó. Một người dùng có thể tạo nhiều playlist.
  - created_at (DATETIME, DEFAULT current_timestamp()): Thời điểm playlist được tạo.

Bảng này lưu trữ thông tin cơ bản về các playlist do người dùng tạo và liên kết chúng với người tạo.

## Bảng playlist_songs

- Mục đích: Tạo mối quan hệ "nhiều-nhiều" giữa bảng playlists và bảng songs. Một playlist có thể chứa nhiều bài hát và một bài hát có thể thuộc về nhiều playlist.
- Các cột:
  - playlist_id (INT, NOT NULL, PRIMARY KEY, FOREIGN KEY references playlists): Khóa ngoại, tham chiếu đến ID của playlist.
  - song_id (INT, NOT NULL, PRIMARY KEY, FOREIGN KEY references songs): Khóa ngoại, tham chiếu đến ID của bài hát.
- Khóa chính phức hợp (playlist_id, song_id): Đảm bảo rằng một bài hát chỉ xuất hiện một lần trong một playlist cụ thể.

bảng trung gian này giải quyết mối quan hệ "nhiều-nhiều" giữa playlist và bài hát, cho phép người dùng tùy chỉnh nội dung playlist của họ.

## Bảng favorite_songs

- Mục đích: Lưu trữ thông tin về các bài hát yêu thích của người dùng. Tạo mối quan hệ "nhiều-nhiều" giữa users và songs cho mục đích yêu thích.
- Các cột:
  - user_id (INT, NOT NULL, PRIMARY KEY, FOREIGN KEY references users): Khóa ngoại, tham chiếu đến ID của người dùng.
  - song_id (INT, NOT NULL, PRIMARY KEY, FOREIGN KEY references songs): Khóa ngoại, tham chiếu đến ID của bài hát được yêu thích.
  - liked_at (DATETIME, DEFAULT current_timestamp()): Thời điểm bài hát được người dùng thêm vào danh sách yêu thích.
- Khóa chính phức hợp (user_id, song_id): Đảm bảo rằng một người dùng chỉ có thể yêu thích một bài hát một lần.

Bảng này cho phép người dùng đánh dấu các bài hát yêu thích của họ và theo dõi thời điểm họ thích chúng.

Mối quan hệ giữa các bảng:

- users một-nhiều playlists (một người dùng có thể tạo nhiều playlist).
- users nhiều-nhiều songs thông qua bảng favorite_songs (một người dùng có thể thích nhiều bài hát và một bài hát có thể được nhiều người dùng thích).
- playlists nhiều-nhiều songs thông qua bảng playlist_songs (một playlist có thể chứa nhiều bài hát và một bài hát có thể thuộc về nhiều playlist).
- genres một-nhiều songs (một thể loại có thể có nhiều bài hát).

#

# THIẾT KẾ VÀ CÀI ĐẶT CHƯƠNG TRÌNH

## 1\. Backend (Python - Django)

- core/ (Ứng dụng quản lý người dùng):  
  - models.py: Định nghĩa model User (tương ứng bảng users).
  - serializers.py: Định nghĩa UserSerializer (cho thông tin người dùng), UserCreationSerializer (cho đăng ký), AuthTokenSerializer (cho đăng nhập).
  - views.py: Sử dụng ModelViewSet hoặc APIView từ DRF để cung cấp các API endpoints cho đăng ký, đăng nhập, lấy/cập nhật thông tin người dùng. Có thể sử dụng TokenObtainPairView từ rest_framework_simplejwt cho JWT authentication.
  - urls.py: Định nghĩa các URL patterns cho các API liên quan đến người dùng (ví dụ: /api/users/register/, /api/users/login/, /api/users/me/).
  - migrations/: Chứa các migrations cho model User.
  - admin.py: Cho phép quản trị viên quản lý người dùng thông qua Django Admin.
- music/ (Ứng dụng quản lý nhạc):  
  - models.py: Định nghĩa các models:
    - Genre (tương ứng bảng genres).
    - Track (tương ứng bảng songs). Lưu ý tên model là Track thay vì Song.
  - serializers.py: Định nghĩa GenreSerializer, TrackSerializer để chuyển đổi dữ liệu giữa models và JSON.
  - views.py: Sử dụng ModelViewSet hoặc ListAPIView, RetrieveAPIView để cung cấp API endpoints cho việc liệt kê và xem chi tiết thể loại và bài hát. Có thể thêm bộ lọc và phân trang.
  - urls.py: Định nghĩa các URL patterns cho các API liên quan đến thể loại và bài hát (/api/music/genres/, /api/music/genres/{id}/tracks/, /api/music/tracks/, /api/music/tracks/{id}/).
  - migrations/: Chứa các migrations cho các models nhạc.
- playlists/ (Ứng dụng quản lý playlist):  
  - models.py: Định nghĩa các models:
    - Playlist (tương ứng bảng playlists).
    - PlaylistTrack (tương ứng bảng playlist_songs - có thể có thêm trường order nếu cần sắp xếp bài hát trong playlist). Lưu ý tên model.
  - serializers.py: Định nghĩa PlaylistSerializer, PlaylistTrackSerializer (có thể dùng để thêm/xóa bài hát).
  - views.py: Sử dụng ModelViewSet để tạo, lấy danh sách, lấy chi tiết, cập nhật, xóa playlist. Cung cấp API endpoints để thêm và xóa bài hát khỏi playlist (có thể là các view riêng hoặc actions trong PlaylistViewSet). Yêu cầu xác thực người dùng.
  - urls.py: Định nghĩa các URL patterns cho các API liên quan đến playlist (/api/playlists/, /api/playlists/{id}/, /api/playlists/{id}/tracks/add/, /api/playlists/{id}/tracks/remove/).
  - migrations/: Chứa các migrations cho các models playlist.
- favorite/ (Ứng dụng quản lý bài hát yêu thích):  
  - models.py: Định nghĩa model FavoriteTrack (tương ứng bảng favorite_songs).
  - serializers.py: Định nghĩa FavoriteTrackSerializer.
  - views.py: Cung cấp API endpoints để thêm bài hát vào yêu thích, xóa bài hát khỏi yêu thích, và lấy danh sách các bài hát yêu thích của người dùng (yêu cầu xác thực). Có thể sử dụng ListCreateDestroyAPIView hoặc ModelViewSet.
  - urls.py: Định nghĩa các URL patterns cho các API liên quan đến yêu thích (/api/favorites/, /api/favorites/{track_id}/).
  - migrations/: Chứa các migrations cho model FavoriteTrack.
- clonespotify_backend/ (Thư mục dự án chính):  
  - settings.py: Cấu hình dự án Django, bao gồm database, cài đặt các ứng dụng (core, music, playlists, favorite, rest_framework, rest_framework_simplejwt), middleware, CORS (nếu frontend chạy trên port khác), v.v.
  - urls.py: URL patterns gốc của dự án, bao gồm các include() để dẫn đến urls.py của từng ứng dụng (ví dụ: path('api/users/', include('core.urls')), path('api/music/', include('music.urls')), v.v.).
  - wsgi.py: Điểm vào cho WSGI server.
  - asgi.py: Điểm vào cho ASGI server.
  - \__init_\_.py: Đánh dấu thư mục là một Python package.

## 2\. FrontEnd (React)

- Component-Based Architecture: Ứng dụng được xây dựng dựa trên các components tái sử dụng, giúp quản lý code dễ dàng hơn và tăng tính modularity.
- Routing: Sử dụng một thư viện routing (thường là react-router-dom) để điều hướng giữa các trang như Trang chủ, Đăng nhập, Đăng ký, và các trang quản lý nhạc/playlist. Các routes có thể được định nghĩa trong thư mục routes/ hoặc trực tiếp trong App.js.
- Layouts: Sử dụng các layout components (ClientLayout, LoginLayout, AdminLayout) để định hình cấu trúc visual của các trang khác nhau. Điều này giúp duy trì sự nhất quán về giao diện.
- Pages: Các trang (pages/Login, pages/Signup, pages/TrangChu, pages/QL_AudioMusic) sẽ chứa các components và logic cụ thể cho từng trang.
- State Management: Ứng dụng có thể sử dụng useState và useEffect cho state cục bộ trong components. Đối với state toàn cục (ví dụ: thông tin người dùng đã đăng nhập, danh sách nhạc đang phát), có thể sử dụng React Context API (trong thư mục contexts/ của Layouts) hoặc một thư viện quản lý state bên ngoài như Redux hoặc Zustand (nếu ứng dụng phức tạp).
- API Interaction: Thư mục services/ chịu trách nhiệm giao tiếp với backend API Django. Các hàm trong đây sẽ thực hiện các HTTP requests đến các endpoints backend để lấy và gửi dữ liệu liên quan đến người dùng, nhạc, playlist, v.v. (sử dụng Axios hoặc fetch).
- Authentication Flow: Các components trong components/DangNhap/ và pages/Login/ sẽ xử lý việc gửi thông tin đăng nhập đến backend API (/api/users/login/). Sau khi đăng nhập thành công, frontend sẽ nhận token xác thực (JWT) và lưu trữ nó (ví dụ: trong Local Storage hoặc một state quản lý authentication). Token này sẽ được gửi kèm trong các request tiếp theo đến các API được bảo vệ. Tương tự cho chức năng đăng ký (components/DangKy/ và pages/Signup/ gọi /api/users/register/).
- Quản lý Nhạc và Playlist: Các components và pages liên quan đến nhạc (trong components/ChucNang/ và pages/QL_AudioMusic/) sẽ sử dụng các hàm trong services/music.js và services/playlists.js để tương tác với các API endpoints tương ứng của backend. Điều này bao gồm việc hiển thị danh sách nhạc, xem chi tiết, tạo, sửa, xóa playlist, thêm/xóa bài hát khỏi playlist.
- Trang Chủ: pages/TrangChu/ và các components trong components/TrangChu/ sẽ hiển thị nội dung chính khi người dùng truy cập ứng dụng lần đầu hoặc sau khi đăng nhập. Nội dung này có thể bao gồm danh sách các bài hát, album, nghệ sĩ nổi bật (dữ liệu lấy từ backend API).
- Global Styles: GlobalStyles.css và thư mục GlobalStyles/ (nếu có CSS-in-JS) định nghĩa các style chung cho toàn bộ ứng dụng, đảm bảo tính nhất quán về mặt giao diện.
- Utils: Các hàm tiện ích trong utils/ có thể được sử dụng để xử lý các tác vụ lặp đi lặp lại hoặc các logic nhỏ trong ứng dụng.

1. **GIAO DIỆN**
2. **CÁCH THỨC CÀI ĐẶT**
3. **Cài đặt Backend**

Clone:

git clone <https://github.com/Tinhs05/CloneSpotify_Backend.git>

cd Spotify_BE

Tạo và kích hoạt môi trường ảo:

python -m venv .venv

.venv\\Scripts\\activate

Cài đặt các thư viện cần thiết:

pip install -r requirements.txt

Cấu hình database:

SQL: CREATE DATABASE musicapp;

settings.py:

DATABASES = {

'default': {

'ENGINE': 'django.db.backends.mysql',

'NAME': 'musicapp',

'USER': 'root',

'PASSWORD': '', # Nhập mật khẩu MySQL của bạn nếu có

'HOST': 'localhost',

'PORT': '3307', # Port mặc định của MySQL là 3306, hãy kiểm tra lại nếu bạn đã thay đổi

}

}

Tạo migrations

python src/manage.py makemigrations

Áp dụng migrations

python src/manage.py migrate

Tạo superuser

python src/manage.py createsuperuser

Chạy server

python src/manage.py runserver

1. **Cài đặt FrontEnd**

npm start

# TỔNG KẾT

Dự án "clone Spotify" là một nỗ lực xây dựng một nền tảng phát nhạc trực tuyến, tương tự như Spotify, sử dụng các công nghệ mã nguồn mở mạnh mẽ là React cho giao diện người dùng, Python và framework Django cho backend. Mục tiêu của dự án là tạo ra một hệ thống cho phép người dùng đăng ký, đăng nhập, duyệt và tìm kiếm thư viện nhạc, tạo và quản lý playlist cá nhân, cũng như tương tác với các tính năng cơ bản của một ứng dụng nghe nhạc hiện đại.

Thông qua việc phát triển API dịch vụ bằng Django REST Framework, dự án cung cấp một backend mạnh mẽ và linh hoạt để quản lý dữ liệu người dùng, danh mục nhạc (bài hát, nghệ sĩ, album, thể loại), playlist và lịch sử nghe. Frontend React đóng vai trò là giao diện tương tác trực quan, cho phép người dùng dễ dàng truy cập và sử dụng các chức năng của nền tảng.