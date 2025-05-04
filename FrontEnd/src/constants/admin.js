export const USER_ROLES = {
  ADMIN: 1,
  USER: 0
};

export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Admin',
  [USER_ROLES.USER]: 'User'
};

export const MESSAGES = {
  SUCCESS: {
    CREATE_USER: 'Thêm người dùng mới thành công!',
    UPDATE_USER: 'Cập nhật người dùng thành công!',
    DELETE_USER: 'Xóa người dùng thành công!',
    RESET_PASSWORD: 'Đặt lại mật khẩu thành công!',
    UPDATE_PREMIUM: 'Cập nhật trạng thái premium thành công!',
    CREATE_SONG: 'Thêm bài hát mới thành công!',
    UPDATE_SONG: 'Cập nhật bài hát thành công!',
    DELETE_SONG: 'Xóa bài hát thành công!',
    CREATE_PLAYLIST: 'Thêm playlist mới thành công!',
    UPDATE_PLAYLIST: 'Cập nhật playlist thành công!',
    DELETE_PLAYLIST: 'Xóa playlist thành công!'
  },
  ERROR: {
    FETCH_USERS: 'Lấy danh sách người dùng thất bại!',
    FETCH_SONGS: 'Lấy danh sách bài hát thất bại!',
    FETCH_PLAYLISTS: 'Lấy danh sách playlist thất bại!',
    DELETE_USER: 'Xóa thất bại: ',
    DELETE_SONG: 'Xóa thất bại: ',
    DELETE_PLAYLIST: 'Xóa thất bại: ',
    RESET_PASSWORD: 'Đặt lại mật khẩu thất bại: ',
    UPDATE_PREMIUM: 'Cập nhật thất bại: ',
    GENERAL: 'Có lỗi xảy ra: '
  },
  CONFIRM: {
    DELETE_USER: {
      TITLE: 'Bạn có chắc muốn xóa người dùng này?',
      CONTENT: 'Hành động này không thể hoàn tác.'
    },
    DELETE_SONG: {
      TITLE: 'Bạn có chắc muốn xóa bài hát này?',
      CONTENT: 'Hành động này không thể hoàn tác.'
    },
    DELETE_PLAYLIST: {
      TITLE: 'Bạn có chắc muốn xóa playlist này?',
      CONTENT: 'Hành động này không thể hoàn tác.'
    },
    RESET_PASSWORD: {
      TITLE: 'Đặt lại mật khẩu',
      CONTENT: 'Bạn có chắc muốn đặt lại mật khẩu cho người dùng này?'
    }
  }
};

export const FORM_RULES = {
  REQUIRED: (field) => ({ required: true, message: `Vui lòng nhập ${field}!` }),
  EMAIL: { type: 'email', message: 'Email không hợp lệ!' }
};

export const TABLE_PAGINATION = {
  PAGE_SIZE: 10,
  SHOW_SIZE_CHANGER: true
}; 