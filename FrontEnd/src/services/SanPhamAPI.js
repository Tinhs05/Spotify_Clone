import axios from "axios";
import { api } from "./config";

export const laySanPhamTheoLoai = async ({ idloaisanpham }) => {
  try {
    const response = await axios.post(`${api}/sanpham/laySanPhamTheoLoai`, {
      idloaisanpham,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const laySanPhamTheoId = async ({ id }) => {
  try {
    const response = await axios.post(`${api}/sanpham/laySanPhamTheoId`, {
      id,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const layDsSanPham = async () => {
  try {
    const response = await axios.get(`${api}/sanpham/layDsSanPham`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const them = async ({ idloaisanpham, ten, dongia, mota }) => {
  try {
    const response = await axios.post(`${api}/sanpham/them`, {
      idloaisanpham,
      ten,
      dongia,
      mota,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sua = async ({ idloaisanpham, ten, dongia, mota, id }) => {
  try {
    const response = await axios.post(`${api}/sanpham/sua`, {
      idloaisanpham,
      ten,
      dongia,
      mota,
      id,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const xoa = async ({ id }) => {
  try {
    const response = await axios.post(`${api}/sanpham/xoa`, { id });
    return response.data;
  } catch (error) {
    throw error;
  }
};
