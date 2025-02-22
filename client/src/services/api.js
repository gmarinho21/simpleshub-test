import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://192.168.0.232:3000';
console.log(import.meta.env.VITE_API_URL)

export const apiService = {
  async uploadPdf(formData) {
    try {
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};