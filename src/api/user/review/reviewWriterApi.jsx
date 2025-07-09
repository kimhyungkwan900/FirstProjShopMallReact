import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const reviewWriter = async ({ reviewData, imageFiles }) => {
  const formData = new FormData();

  formData.append(
    "reviewFormDTO",
    new Blob([JSON.stringify(reviewData)], { type: "application/json" })
  );

  imageFiles.forEach((file) => {
    formData.append("reviewImgFile", file);
  });

  const response = await axios.post(
    `${API_BASE_URL}/mypage/review/writer`,
    formData
    // headers: { 'Content-Type': 'multipart/form-data' } 제거!
  );

  return response.data;
};